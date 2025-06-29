import React from "react";
import { Link } from "react-router-dom";

export default function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      <img
        src={hotel?.profileImage || "/placeholder-hotel.jpg"}
        alt={hotel?.name || "Hotel"}
        className="h-[200px] w-full object-cover object-center rounded-t-xl"
        onError={(e) => (e.target.src = "/placeholder-hotel.jpg")}
        loading="lazy"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-700 mb-1">
          {hotel?.name || "Unnamed Hotel"}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {hotel.location || "Unknown"} | ₹
          {hotel.price ? hotel.price.toLocaleString() : "Starting Soon"}
        </p>
        <Link
          to={`/hotels/${hotel?._id}`}
          className="inline-block text-sm text-white bg-green-600 px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          More Details →
        </Link>
      </div>
    </div>
  );
}
