import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "user") {
      alert("You must be logged in as a user to book tours.");
      navigate("/login");
      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: tour });
    alert("Tour added to cart!");
  };

  useEffect(() => {
    API.get(`/tours/${id}`)
      .then((res) => setTour(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!tour) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Main Image */}
      <img
        src={tour.image}
        alt={tour.title}
        className="w-full h-64 object-cover rounded mb-4"
      />

      {/* Title & Info */}
      <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
      <p className="text-gray-600 mb-2">{tour.location}</p>
      <p className="text-gray-700 mb-4">₹{tour.price}</p>
      <p className="text-gray-600 mb-6">{tour.description}</p>

      {/* Book Button */}
      <button
        className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
        onClick={handleAddToCart}
      >
        Book Now
      </button>

      {/* Gallery Images */}
      {tour.gallery && tour.gallery.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-10 mb-3">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {tour.gallery.map((imgUrl, idx) => {
              const cleanedPath = imgUrl.replace(/\\/g, "/");
              const normalizedUrl = imgUrl.startsWith("http")
                ? imgUrl
                : `http://localhost:5000/${cleanedPath}`;

              return (
                <div
                  key={idx}
                  className="w-full relative overflow-hidden rounded shadow-sm bg-gray-200"
                  style={{ paddingTop: "66.66%" }}
                >
                  <img
                    src={normalizedUrl}
                    alt={`Gallery ${idx + 1}`}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                    loading="lazy"
                    onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
                    onError={(e) => (e.target.src = "/placeholder-hotel.jpg")}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
