import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = location.trim();
    if (!trimmed) return;
    navigate(`/tours?location=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl flex flex-wrap md:flex-nowrap items-center gap-4 px-6 py-4 w-full max-w-4xl mx-auto"
    >
      {/* Location Input */}
      <div className="flex items-center gap-2 flex-1 min-w-[150px]">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <i className="fas fa-map-marker-alt text-green-600" />
        <input
          id="location"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="outline-none w-full placeholder-gray-500 text-base"
          aria-label="Search by location"
        />
      </div>

      {/* Date Input (UI only) */}
      <div className="flex items-center gap-2 flex-1 min-w-[150px]">
        <label htmlFor="date" className="sr-only">
          Date
        </label>
        <i className="fas fa-calendar-alt text-green-600" />
        <input
          id="date"
          type="date"
          className="outline-none w-full text-base text-gray-700"
          aria-label="Select date"
        />
      </div>

      {/* Tour Type Select (UI only) */}
      <div className="flex items-center gap-2 flex-1 min-w-[150px]">
        <label htmlFor="tour-type" className="sr-only">
          Tour Type
        </label>
        <i className="fas fa-tags text-green-600" />
        <select
          id="tour-type"
          className="outline-none w-full text-base text-gray-700"
          aria-label="Select tour type"
        >
          <option value="">Select Type</option>
          <option value="Family Tour">Family Tour</option>
          <option value="Adventure">Adventure</option>
          <option value="Romantic">Romantic</option>
          <option value="Cultural">Cultural</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="bg-green-600 !text-white px-6 py-2 rounded-full hover:bg-green-700 transition text-base"
      >
        Search
      </button>
    </form>
  );
}
