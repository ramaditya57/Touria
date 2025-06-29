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
    // console.log("Hotel ID from params:", id);
    API.get(`/hotels/${id}`)
      .then((res) => {
        // console.log("Fetched hotel:", res.data);
        setHotel(res.data);
      })
      .catch((err) => {
        console.error("Hotel fetch error:", err.response?.status, err.message);
        setError("Failed to load hotel details.");
      });
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!hotel) {
    return (
      <p className="text-center text-green-600 mt-10">
        Loading hotel details...
      </p>
    );
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Image */}
      <motion.img
        src={hotel?.profileImage || "/placeholder-hotel.jpg"}
        alt={hotel?.name || "Hotel"}
        className="w-full h-72 object-cover rounded-xl shadow mb-6"
        onError={(e) => (e.target.src = "/placeholder-hotel.jpg")}
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      {/* Hotel Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-green-800 mb-2">{hotel.name}</h1>
        <p className="text-gray-500 text-sm mb-1">{hotel.location}</p>
        {hotel.price && (
          <p className="text-green-600 font-semibold text-lg mb-4">
            ₹{hotel.price.toLocaleString()} per night
          </p>
        )}
        <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
          {hotel.description || "No description available at the moment."}
        </p>
      </motion.div>

      {/* Book Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        {/* <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300 shadow-md">
          Book This Hotel
        </button> */}
        <button
          onClick={addToCart}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300 shadow-md"
        >
          Book This Hotel
        </button>
      </motion.div>

      {/* Gallery Section */}
      {hotel.gallery?.length > 0 && (
        <div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Gallery</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {hotel.gallery.map((img, idx) => (
              <img
                key={idx}
                src={img?.replace(/\\/g, "/")}
                alt={`Gallery ${idx + 1}`}
                className="w-48 h-32 object-cover rounded shadow-sm flex-shrink-0"
                onError={(e) => (e.target.src = "/placeholder-hotel.jpg")}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
