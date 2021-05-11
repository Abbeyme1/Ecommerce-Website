import Product from "../models/product.js";
import asyncHandler from "express-async-handler";

//? @desc   FETCH all products
//? @route  GET /api/products/
//? @desc   PUBLIC

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments(keyword);

  const products = await Product.find(keyword)
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  // const products = await Product.find({...keyword});
  // res.status(401);
  // throw new Error("Not Authorized");
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (comment.trim().length == 0 || rating == 0) {
    res.status(400);
    throw new Error("Please Enter Fields");
  }
  // console.log(rating, comment);
  const product = await Product.findById(req.params.id);
  if (product) {
    const isReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );

    if (isReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    }

    const review = {
      name: req.user.name,
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((a, i) => i.rating + a, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ rating: -1 }).limit(4);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
};
