import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import TourFormModal from "../components/TourFormModal";
import { message } from "antd";

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const fetchTours = () => {
    API.get("/tours")
      .then((res) => setTours(res.data))
      .catch((err) => {
        console.error(err);
        message.error("Failed to load tours");
      });
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tours/${id}`);
      message.success("Tour deleted");
      fetchTours();
    } catch (err) {
      console.error(err);
      message.error("Delete failed");
    }
  };

  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setSelectedTour(null);
    setModalVisible(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedTour) {
        // console.log("➡️ Updating tour with ID:", selectedTour._id);
        await API.put(`/tours/${selectedTour._id}`, formData);
        message.success("Tour updated");
      } else {
        await API.post("/tours", formData);
        message.success("Tour created");
      }
      setModalVisible(false);
      fetchTours();
    } catch (err) {
      console.error(err);
      message.error("Operation failed");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Manage Tours</h1>
          <button onClick={handleAdd} className="bg-green-600 !text-white px-4 py-2 rounded">
            + Add Tour
          </button>
        </div>
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Location</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour._id} className="border-b">
                <td className="p-2">
                  <img src={tour.image} alt={tour.title} className="h-12 w-16 object-cover rounded" />
                </td>
                <td className="p-2">{tour.title}</td>
                <td className="p-2">{tour.location}</td>
                <td className="p-2">₹{tour.price}</td>
                <td className="p-2 !space-x-2">
                  <button onClick={() => handleEdit(tour)} className="bg-yellow-500 !text-white px-2 py-1 rounded text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(tour._id)} className="bg-red-600 !text-white px-2 py-1 rounded text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Add/Edit */}
        <TourFormModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmit}
          initialData={selectedTour}
        />
      </div>
    </div>
  );
}
