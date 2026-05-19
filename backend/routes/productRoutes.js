import express from "express";
import { getProducts } from "../controllers/productController.js";

import { getProductById } from "../controllers/productController.js";


const router = express.Router();

router.get("/:id", getProductById);

router.get("/", getProducts);

export default router;