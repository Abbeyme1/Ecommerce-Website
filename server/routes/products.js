import express from "express";
const router = express.Router();
import Product from "../models/product.js";
import asyncHandler from "express-async-handler";

//? @desc   FETCH all products
//? @route  GET /api/products/
//? @desc   PUBLIC
// router.get("/", (req, res) => {
//   Product.find()
//     .then((products) => res.json(products))
//     .catch((err) => console.log(err));
// });

//! with asyc awai method
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  }),
);

//? @desc   FETCH specific products
//? @route  GET /api/products/:id
//? @desc   PUBLIC
// router.get("/:id", (req, res) => {
//   Product.findOne({ _id: req.params.id }).then((product) => {
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ message: "Product Not Found" });
//     }
//   });
// });

//! with async

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      // res.status(404).json({ message: "Product Not Found" });
      res.status(404);
      throw new Error("Product not found");
    }
  }),
);

export default router;
