import React, { useState } from "react";
import API from "../services/api";

export default function BookingPage() {
  const [type, setType] = useState("Tour");
  const [referenceId, setReferenceId] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/bookings", { type, referenceId, date });
      alert("Booking successful!");
    } catch (err) {
      console.error(err);
      alert("Booking failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-4 mt-10 rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Make a Booking</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <select className="w-full border p-2 rounded" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Tour">Tour</option>
          <option value="Hotel">Hotel</option>
          <option value="Flight">Flight</option>
        </select>
        <input
          type="text"
          placeholder="Reference ID"
          className="w-full border p-2 rounded"
          value={referenceId}
          onChange={(e) => setReferenceId(e.target.value)}
        />
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">Book Now</button>
      </form>
    </div>
  );
}
