import express from "express";
import { getAllFlights, createFlight } from "../controllers/flightController.js";
import { protect, adminMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", getAllFlights);
router.post("/", protect, adminMiddleware, createFlight);

export default router;
