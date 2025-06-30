import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hotel name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Hotel description is required"],
      minlength: [20, "Description should be at least 20 characters"],
    },
    location: {
      type: String,
      required: [true, "Hotel location is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [100, "Price must be at least ₹100"],
    },
    profileImage: {
      type: String,
      default: "/placeholder-hotel.jpg", // fallback main image
    },
    gallery: {
      type: [String], // array of image URLs
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("hotel", hotelSchema);