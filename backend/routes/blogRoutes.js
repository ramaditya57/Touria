import express from "express";
import {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";
import { protect, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.post("/", protect, adminMiddleware, createBlog);

// ✅ Protect update & delete routes
router.put("/:id", protect, adminMiddleware, updateBlog);
router.delete("/:id", protect, adminMiddleware, deleteBlog);

export default router;
