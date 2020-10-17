import jwt from "jsonwebtoken";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // token = req.headers.authorization.replace("Bearer ", "");
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      req.user = await User.findById(decode.id).select("-password");
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Not Authorized , token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized , no token");
  }

  next();
});

export { protect };
