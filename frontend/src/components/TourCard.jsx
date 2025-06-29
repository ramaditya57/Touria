import React from "react";
import { Link } from "react-router-dom";

export default function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.image || "/placeholder-tour.jpg"}
          alt={tour.title}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
          onError={(e) => (e.target.src = "/placeholder-tour.jpg")}
        />
      </div>

      {/* Info Section */}
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-bold text-gray-800 truncate">{tour.title}</h3>
        <p className="text-sm text-gray-600">
          {tour.location} &nbsp;|&nbsp; <span className="text-green-700 font-medium">₹{tour.price}</span>
        </p>
        <Link
          to={`/tours/${tour._id}`}
          className="inline-block text-sm text-green-600 hover:text-green-700 font-medium mt-1"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
