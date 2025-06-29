import React, { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import HotelCard from "../components/HotelCard"; // adjust path as needed

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/hotels")
      .then((res) => {
        setHotels(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch hotels.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-green-600 mt-10">Loading hotels...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.h1
        className="text-4xl font-bold text-green-800 mb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Hotels
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
