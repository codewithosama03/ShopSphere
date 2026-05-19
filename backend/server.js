import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

import cartRoutes from "./routes/cartRoutes.js";

import userRoutes from "./routes/userRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";


const app = express();

//  Connect DB
connectDB();

//  Middleware
app.use(cors());
app.use(express.json());

//  Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

//  Routes
app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});