import React, { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import HotelCard from "../components/HotelCard"; // Adjust if needed

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/hotels")
      .then((res) => {
        setHotels(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch hotels.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center text-green-600 mt-16 text-lg">Loading hotels...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-16 text-lg">{error}</p>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="text-center mt-16 text-gray-600 text-lg">
        No hotels available at the moment.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold text-green-800 text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore Our Hotels
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {hotels.map((hotel, index) => (
          <motion.div
            key={hotel._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <HotelCard hotel={hotel} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
