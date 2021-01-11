import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

//? @desc   Auth user & gettoken
//? @route  POST /api/users/login
//? @desc   PUBLIC

const user = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });


  // mathPassword is in UserController
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password");
  }
});

//? @desc   Register a new user
//? @route  POST /api/users
//? @desc   PUBLIC

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existsUser = await User.findOne({ email: email });

  if (existsUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//? @desc   get userinfo
//? @route  GET /api/users/profile
//? @desc   PRIVATE

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//? @desc   UPDATE userinfo
//? @route  POST /api/users/profile/
//? @desc   PRIVATE

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });

  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    if (req.body.password) {
      user.password = req.body.password;
    }

    user.save().then((user) => {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { user, getUserProfile, registerUser, updateUserProfile };
