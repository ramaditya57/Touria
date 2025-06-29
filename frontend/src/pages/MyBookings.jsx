import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  if (bookings.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-700">No bookings found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((booking) => {
          const item = booking.item;
          if (!item) return null;

          const title = item.title || item.name || "No title";
          const location = item.location || "Unknown";
          const price = item.price ? `₹${item.price}` : "₹N/A";
          const image = item.image || "/placeholder.jpg";

          return (
            <div
              key={booking._id}
              className="p-4 bg-white rounded shadow flex gap-4 items-center"
            >
              <img
                src={image}
                alt={title}
                className="w-32 h-24 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-600">{location}</p>
                <p className="text-green-700 font-bold mt-1">{price}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Booking Date:{" "}
                  {booking.date
                    ? new Date(booking.date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-xs text-gray-400">
                  Booked on: {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">Booking ID</p>
                <p className="text-sm">{booking._id}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
