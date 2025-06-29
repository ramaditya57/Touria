import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function FlightList() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    API.get("/flights")
      .then((res) => setFlights(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Available Flights</h1>
      <div className="grid grid-cols-1 gap-4">
        {flights.map((f) => (
          <div key={f._id} className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold">{f.flightNumber} | ₹{f.price}</h3>
            <p className="text-gray-600">{f.from} → {f.to}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
