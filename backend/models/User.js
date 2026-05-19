import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  qty: {
    type: Number,
    default: 1,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    // NEW CART FIELD
    cart: [cartItemSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;