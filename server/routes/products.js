import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

//! with asyc awai method
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
