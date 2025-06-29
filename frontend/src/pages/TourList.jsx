import React, { useEffect, useState } from "react";
import TourCard from "../components/TourCard";
import API from "../services/api";

export default function TourList() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/tours")
      .then((res) => {
        setTours(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tours.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center text-green-600 text-lg mt-16">
        Loading tours...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 text-lg mt-16">{error}</p>
    );
  }

  if (tours.length === 0) {
    return (
      <p className="text-center text-gray-600 text-lg mt-16">
        No tours available at the moment.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
        Explore Our Tours
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
