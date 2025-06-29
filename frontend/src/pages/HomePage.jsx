import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.61), rgba(0, 0, 0, 0.68)), url('/home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-white p-10 rounded-lg max-w-2xl text-center">
          <p className="italic text-green-400 text-xl mb-3">
            Experience Unmatched Delight With Us
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Where Exceptional Memories Begin
          </h1>
          <p className="text-gray-200 mb-6 text-base md:text-lg">
            We are a professional and reliable tour company offering a wide range of experiences tailored for your unforgettable journey.
          </p>
          <button
            onClick={() => navigate("/tours")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
          >
            Explore Tours
          </button>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="mt-16 mb-16 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4">
          <SearchBar />
        </div>
      </section>
    </div>
  );
}
