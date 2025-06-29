import React from "react";
import { Link } from "react-router-dom";

export default function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img src={tour.image} alt={tour.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{tour.title}</h3>
        <p className="text-sm text-gray-600">{tour.location} | ₹{tour.price}</p>
        <Link to={`/tours/${tour._id}`} className="text-green-600 hover:underline text-sm">View Details →</Link>
      </div>
    </div>
  );
}
