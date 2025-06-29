import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import HotelFormModal from "../components/HotelFormModal";
import { message } from "antd";

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const fetchHotels = () => {
    API.get("/hotels")
      .then((res) => setHotels(res.data))
      .catch((err) => {
        console.error(err);
        message.error("Failed to load hotels");
      });
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await API.delete(`/hotels/${id}`);
      message.success("Hotel deleted");
      fetchHotels();
    } catch (err) {
      console.error("Delete failed:", err);
      message.error("Failed to delete hotel.");
    }
  };

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setSelectedHotel(null);
    setModalVisible(true);
  };

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      if (selectedHotel) {
        await API.put(`/hotels/${selectedHotel._id}`, payload);
        message.success("Hotel updated");
      } else {
        await API.post("/hotels", payload);
        message.success("Hotel added");
      }
      setModalVisible(false);
      fetchHotels();
    } catch (err) {
      console.error("Submit error:", err);
      message.error("Error saving hotel.");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Manage Hotels</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Hotel
          </button>
        </div>

        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Location</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel._id} className="border-b">
                <td className="p-2">
                  <img
                    src={hotel.profileImage || "/placeholder-hotel.jpg"}
                    alt={hotel.name}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="p-2 font-semibold">{hotel.name}</td>
                <td className="p-2">{hotel.location}</td>
                <td className="p-2">₹{hotel.price}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(hotel)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {hotels.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No hotels found.</p>
        )}

        <HotelFormModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmit}
          initialData={selectedHotel}
        />
      </div>
    </div>
  );
}
