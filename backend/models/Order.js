import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  image: String,
  price: Number,

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const shippingAddressSchema = new mongoose.Schema({
  address: String,
  city: String,
  postalCode: String,
  country: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [orderItemSchema],

    shippingAddress: shippingAddressSchema,

    paymentMethod: {
      type: String,
      default: "Razorpay",
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    razorpayOrderId: String,

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;