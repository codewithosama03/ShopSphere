import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./data/sampleProducts.js";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany(); //  clears old data
    await Product.insertMany(products);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();