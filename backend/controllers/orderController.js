import Order from "../models/Order.js";
import User from "../models/User.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const user = await User.findById(req.user.id).populate(
      "cart.product"
    );

    if (!user.cart || user.cart.length === 0) {
      return res
        .status(400)
        .json({ message: "Cart is empty" });
    }

 const validCart = user.cart.filter(
  (item) => item.product
);

const orderItems = validCart.map((item) => ({
  name: item.product.name,
  qty: item.qty,
  image: item.product.image,
  price: item.product.price,
  product: item.product._id,
}));

    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    user.cart = [];
    await user.save();

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};