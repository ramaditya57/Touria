import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.61), rgba(0, 0, 0, 0.68)), url('/home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-white p-10 rounded-lg max-w-xl text-center">
          <p className="italic text-green-400 mb-2 text-xl">
            Experience Unmatched Delight With Us
          </p>
          <h1 className="!text-5xl md:text-5xl font-bold mb-4">
            Where Exceptional Memories Begin
          </h1>
          <p className="text-gray-200 mb-6">
            We are a professional and reliable tours company that offers a wide
            range of services.
          </p>
          <button
            onClick={() => navigate("/tours")}
            className="bg-green-600 px-6 py-3 rounded-full hover:bg-green-700 transition"
          >
            Explore Tours
          </button>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="mt-[40px] px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4">
          <SearchBar />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="max-w-4xl mx-auto text-center p-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Welcome to Touria
        </h2>
        <p className="text-gray-600">
          Explore top destinations, book amazing hotels and flights, and create
          unforgettable memories.
        </p>
      </div>
    </div>
  );
}
