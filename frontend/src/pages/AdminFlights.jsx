import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminFlights() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    API.get("/flights")
      .then((res) => setFlights(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Manage Flights</h1>
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Flight</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((f) => (
              <tr key={f._id} className="border-b">
                <td className="p-2">{f.flightNumber}</td>
                <td className="p-2">{f.from}</td>
                <td className="p-2">{f.to}</td>
                <td className="p-2">₹{f.price}</td>
                <td className="p-2 space-x-2">
                  <button className="bg-green-600 text-white px-2 py-1 rounded text-sm">Edit</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
