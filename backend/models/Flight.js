import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airline: String,
  from: String,
  to: String,
  price: Number,
  departureDate: Date
}, { timestamps: true });

export default mongoose.model("flight", flightSchema);
