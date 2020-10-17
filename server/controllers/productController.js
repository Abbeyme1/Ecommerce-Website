import Product from "../models/product.js";
import asyncHandler from "express-async-handler";

//? @desc   FETCH all products
//? @route  GET /api/products/
//? @desc   PUBLIC

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  // res.status(401);
  // throw new Error("Not Authorized");
  res.json(products);
});

// router.get("/", (req, res) => {
//   Product.find()
//     .then((products) => res.json(products))
//     .catch((err) => console.log(err));
// });

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    // res.status(404).json({ message: "Product Not Found" });
    res.status(404);
    throw new Error("Product not found");
  }
});

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

export { getProducts, getProductById };
