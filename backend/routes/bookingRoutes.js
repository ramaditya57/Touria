import express from "express";
import {
  createBooking,
  myBookings,
  getAllBookings,
  deleteBooking
} from "../controllers/bookingController.js";
import { protect, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, myBookings);
router.get("/all", protect, adminMiddleware, getAllBookings); // ✅ NEW
router.delete("/:id", protect, adminMiddleware, deleteBooking);

export default router;
