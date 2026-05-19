import User from "../models/User.js";

//  GET USER CART
export const getCart = async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.product");
  res.json(user.cart);
};

//  ADD TO CART
export const addToCart = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user.id);

  const itemExists = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (itemExists) {
    itemExists.qty += 1;
  } else {
    user.cart.push({ product: productId, qty: 1 });
  }

  await user.save();

  res.json(user.cart);
};

//  REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user.id);

  const item = user.cart.find(
    (i) => i.product.toString() === productId
  );

  if (item) {
    if (item.qty > 1) {
      item.qty -= 1;
    } else {
      user.cart = user.cart.filter(
        (i) => i.product.toString() !== productId
      );
    }
  }

  await user.save();

  const updatedUser = await User.findById(req.user.id).populate("cart.product");

  res.json(updatedUser.cart);
};