import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-800 text-gray-200 min-h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold text-green-500">Admin Panel</h2>
      <Link to="/admin" className="block hover:text-green-400">Dashboard</Link>
      <Link to="/admin/tours" className="block hover:text-green-400">Manage Tours</Link>
      <Link to="/admin/hotels" className="block hover:text-green-400">Manage Hotels</Link>
      {/* <Link to="/admin/flights" className="block hover:text-green-400">Manage Flights</Link> */}
      <Link to="/admin/blogs" className="block hover:text-green-400">Manage Blogs</Link>
      <Link to="/admin/bookings" className="block hover:text-green-400">Manage Bookings</Link>
    </div>
  );
}
