import express from "express";
const router = express.Router();
import {
  user,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

//! with asyc awai method
router.route("/").post(registerUser);
router.post("/login", user);
router.route("/profile").get(protect, getUserProfile);

export default router;
