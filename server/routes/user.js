import express from "express";
const router = express.Router();
import {
  user,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//! with asyc awai method
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", user);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
//! VERY IMPORTANT... AS WE CAN USE ONE ROUTE FOR MULTIPLE REQUESTSS...

export default router;
