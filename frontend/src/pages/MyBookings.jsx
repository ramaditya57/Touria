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
      <div className="text-center mt-24">
        <h2 className="text-2xl font-semibold text-gray-700">No bookings found</h2>
        <p className="text-sm text-gray-500 mt-2">You haven’t made any bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
        My Bookings
      </h2>

      <div className="space-y-6">
        {bookings.map((booking) => {
          const item = booking.item;
          if (!item) return null;

          const title = item.title || item.name || "Untitled";
          const location = item.location || "Unknown";
          const price = item.price ? `₹${item.price}` : "₹N/A";
          const image = item.image || "/placeholder.jpg";

          return (
            <div
              key={booking._id}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={image}
                alt={title}
                className="w-full md:w-52 h-40 object-cover"
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />

              <div className="flex flex-col justify-between p-4 flex-grow">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                  <p className="text-sm text-gray-600">{location}</p>
                  <p className="text-green-700 font-bold mt-1">{price}</p>
                </div>

                <div className="text-sm text-gray-600 mt-2">
                  <p>
                    <span className="font-medium">Booking Date:</span>{" "}
                    {booking.date
                      ? new Date(booking.date).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Booked on: {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="md:w-48 flex flex-col justify-center items-center p-4 border-t md:border-t-0 md:border-l border-gray-200 text-center">
                <p className="text-sm font-semibold text-green-700">Booking ID</p>
                <p className="text-xs text-gray-600 break-words">{booking._id}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
