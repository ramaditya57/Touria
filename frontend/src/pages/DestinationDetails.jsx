import React from "react";
import { useParams } from "react-router-dom";

export default function DestinationDetails() {
  const { id } = useParams();
  // For now we can mock data
  const destination = { id, name: "Kashmir", description: "Beautiful valleys and mountains", image: "/dest-kashmir.jpg" };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <img src={destination.image} alt={destination.name} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
      <p className="text-gray-600">{destination.description}</p>
    </div>
  );
}
