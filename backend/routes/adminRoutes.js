// backend/routes/adminRoutes.js
import express from "express";
import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const tours = await Tour.countDocuments();
    const hotels = await Hotel.countDocuments();
    const bookings = await Booking.countDocuments();

    res.json({ users, tours, hotels, bookings });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
