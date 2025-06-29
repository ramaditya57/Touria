import express from "express";
import {
  getAllTours,
  getTour,
  createTour,
  deleteTour,
  getToursByLocation,
  updateTour,
} from "../controllers/tourController.js";
import { protect, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Updated route to avoid conflict with "/:id"
router.get("/by-location/:location", getToursByLocation);

// Default routes
router.get("/", getAllTours);
router.get("/:id", getTour);
router.post("/", protect, adminMiddleware, createTour);
router.put("/:id", updateTour);
router.delete("/:id", protect, adminMiddleware, deleteTour);

export default router;
