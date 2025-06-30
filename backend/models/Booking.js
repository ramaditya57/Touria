import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["tour", "hotel", "flight"] },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "type",
    },
    date: Date,
  },
  { timestamps: true }
);


export default mongoose.model("Booking", bookingSchema);