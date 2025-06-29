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

  if (!tour) {
    return <p className="text-center text-lg text-gray-600 mt-12">Loading tour details...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Main Image */}
      <div className="w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg shadow">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tour Details */}
      <div className="mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{tour.title}</h1>
        <p className="text-green-600 text-lg mb-1">{tour.location}</p>
        <p className="text-xl font-semibold text-gray-900 mb-4">₹{tour.price}</p>
        <p className="text-gray-700 leading-relaxed mb-6">{tour.description}</p>

        <button
          className="bg-green-600 hover:bg-green-700 !text-white font-semibold px-6 py-2 rounded-full shadow transition"
          onClick={handleAddToCart}
        >
          Book Now
        </button>
      </div>

      {/* Gallery */}
      {tour.gallery && tour.gallery.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {tour.gallery.map((imgUrl, idx) => {
              const cleanedPath = imgUrl.replace(/\\/g, "/");
              const normalizedUrl = imgUrl.startsWith("http")
                ? imgUrl
                : `http://localhost:5000/${cleanedPath}`;

              return (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-lg bg-gray-100 shadow"
                  style={{ paddingTop: "66.66%" }}
                >
                  <img
                    src={normalizedUrl}
                    alt={`Gallery ${idx + 1}`}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                    loading="lazy"
                    onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
                    onError={(e) => (e.currentTarget.src = "/placeholder-hotel.jpg")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
