import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import TourCard from "../components/TourCard";

export default function FilteredTourList() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const location = params.get("location");

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError("");
      try {
        let url = "/tours";
        if (location) {
          url += `?location=${encodeURIComponent(location)}`;
        }

        const res = await API.get(url);
        setTours(res.data);
      } catch (err) {
        console.error("❌ Fetch failed:", err);
        setError("Failed to load tours. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [location]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        {location ? `Search Results for "${location}"` : "All Tours"}
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 h-52 rounded animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tours.length === 0 ? (
        <p className="text-gray-500">
          No tours found{location && ` for "${location}"`}.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}
