import React, { useState } from "react";
import API from "../services/api";

export default function BookingPage() {
  const [type, setType] = useState("Tour");
  const [referenceId, setReferenceId] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!referenceId || !date) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await API.post("/bookings", { type, referenceId, date });
      alert("✅ Booking successful!");
      setReferenceId("");
      setDate("");
    } catch (err) {
      console.error(err);
      alert("❌ Booking failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Make a Booking
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Booking Type
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Tour">Tour</option>
              <option value="Hotel">Hotel</option>
              <option value="Flight">Flight</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reference ID
            </label>
            <input
              type="text"
              placeholder="Enter Reference ID"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Booking Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}
