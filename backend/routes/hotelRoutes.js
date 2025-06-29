import express from "express";
import {
    getAllHotels,
    createHotel,
    getHotelById,
    updateHotel,
    deleteHotel,
} from "../controllers/hotelController.js";
import { protect, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllHotels);
router.get("/:id", getHotelById);
router.put("/:id", protect, adminMiddleware, updateHotel);
router.delete("/:id", protect, adminMiddleware, deleteHotel);
router.post("/", protect, adminMiddleware, createHotel);

export default router;
