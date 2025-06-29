import React from "react";
import { Link } from "react-router-dom";

export default function DestinationList() {
  const destinations = [
    { id: 1, name: "Kashmir", image: "/dest-kashmir.jpg" },
    { id: 2, name: "Goa", image: "/dest-goa.jpg" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Destinations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {destinations.map((d) => (
          <Link key={d.id} to={`/destination/${d.id}`}>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img src={d.image} alt={d.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{d.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
