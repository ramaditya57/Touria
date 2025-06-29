import Booking from "../models/Booking.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const booking = new Booking({ ...req.body, user: req.user.id });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get bookings for the logged-in user
export const myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("item");
    res.json(bookings);
  } catch (err) {
    console.error("myBookings error:", err); // ✅ ADD THIS
    res.status(500).json({ error: err.message });
  }
};


// Admin: Get all bookings for all users
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")     // Populates user data
      .populate("item")                   // ✅ Also populate the tour/hotel/flight
      .sort({ createdAt: -1 });           // Most recent first

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a booking by ID
export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ msg: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
