import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    API.get("/bookings/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await API.delete(`/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Failed to cancel:", err);
      alert("Failed to cancel booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Manage Bookings
        </h1>
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">User</th>
              <th className="p-2">Item</th>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => {
              const item = b.item || {};
              const image = item.image || "/placeholder.jpg";
              const title = item.title || item.name || "Untitled";
              const location = item.location || "Unknown";
              const price = item.price || 0;

              return (
                <tr key={b._id} className="border-b">
                  {/* User Info */}
                  <td className="p-2">
                    <p className="font-semibold">
                      {b.user?.name || "Unknown User"}
                    </p>
                    <p className="text-sm text-gray-500">{b.user?.email}</p>
                  </td>

                  {/* Item Info */}
                  <td className="p-2 flex items-center gap-2">
                    {image && (
                      <img
                        src={image}
                        alt={title}
                        className="w-16 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-gray-500">{location}</p>
                    </div>
                  </td>

                  {/* Date Info */}
                  <td className="p-2">
                    <p>{new Date(b.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(b.createdAt).toLocaleTimeString()}
                    </p>
                  </td>

                  {/* Amount */}
                  <td className="p-2 font-bold text-green-700">₹{price}</td>

                  {/* Action */}
                  <td className="p-2">
                    <button
                      onClick={() => handleCancel(b._id)}
                      className="bg-red-600 !text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="text-center text-gray-500 !mt-6">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
