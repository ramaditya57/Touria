import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    image: String,       // main profile/thumbnail image
    gallery: [String],   // multiple additional gallery images
    location: String,
  },
  { timestamps: true }
);

export default mongoose.model("tour", tourSchema);
