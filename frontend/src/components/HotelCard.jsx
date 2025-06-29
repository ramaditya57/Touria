import React from "react";
import { Link } from "react-router-dom";

export default function HotelCard({ hotel }) {
  const name = hotel?.name || "Unnamed Hotel";
  const image = hotel?.profileImage || hotel?.image || "/placeholder-hotel.jpg";
  const location = hotel?.location || "Unknown";
  const price = hotel?.price ? `₹${hotel.price.toLocaleString()}` : "Starting Soon";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col">
      {/* Fixed Aspect Ratio Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
          onError={(e) => (e.target.src = "/placeholder-hotel.jpg")}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-green-700 truncate">{name}</h3>
          <p className="text-sm text-gray-600 mt-1 truncate">
            {location} &nbsp;|&nbsp; <span className="text-green-700 font-medium">{price}</span>
          </p>
        </div>

        <Link
          to={`/hotels/${hotel?._id}`}
          className="inline-block text-sm bg-green-600 text-white mt-3 px-4 py-2 rounded-full hover:bg-green-700 transition font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
