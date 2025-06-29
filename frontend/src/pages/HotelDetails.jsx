import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState("");
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: "ADD_HOTEL_TO_CART", payload: hotel });
    alert("Hotel added to cart!");
  };

  useEffect(() => {
    API.get(`/hotels/${id}`)
      .then((res) => setHotel(res.data))
      .catch((err) => {
        console.error("Hotel fetch error:", err.response?.status, err.message);
        setError("Failed to load hotel details.");
      });
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!hotel) {
    return <p className="text-center text-green-600 mt-10">Loading hotel details...</p>;
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Image */}
      <motion.div
        className="w-full h-[280px] md:h-[380px] rounded-xl overflow-hidden shadow mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <img
          src={hotel?.profileImage || "/placeholder-hotel.jpg"}
          alt={hotel?.name || "Hotel"}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "/placeholder-hotel.jpg")}
          loading="lazy"
        />
      </motion.div>

      {/* Hotel Info */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-green-800">{hotel.name}</h1>
        <p className="text-sm text-gray-500">{hotel.location}</p>
        {hotel.price && (
          <p className="text-lg font-semibold text-green-600">
            ₹{hotel.price.toLocaleString()} <span className="text-sm text-gray-600">per night</span>
          </p>
        )}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {hotel.description || "No description available at the moment."}
        </p>
      </motion.div>

      {/* Book Button */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <button
          onClick={addToCart}
          className="bg-green-600 hover:bg-green-700 !text-white font-medium px-6 py-2 rounded-full transition duration-300 shadow-md"
        >
          Book This Hotel
        </button>
      </motion.div>

      {/* Gallery Section */}
      {hotel.gallery?.length > 0 && (
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gallery</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
            {hotel.gallery.map((img, idx) => (
              <div key={idx} className="flex-shrink-0 w-48 h-32 rounded overflow-hidden shadow-sm bg-gray-100">
                <img
                  src={img?.replace(/\\/g, "/")}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "/placeholder-hotel.jpg")}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
