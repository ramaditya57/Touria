import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import API from "../services/api";
import {
  UserCircle,
  MapPin,
  Hotel,
  BookOpenCheck,
  CalendarDays,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/admin/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Stats fetch failed:", err.message);
        setError("Failed to load dashboard stats.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Monitor and manage your platform’s activities in real time.
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                icon={<UserCircle className="text-blue-600" />}
                label="Users"
                value={stats.users}
                color="blue"
              />
              <StatCard
                icon={<MapPin className="text-emerald-600" />}
                label="Tours"
                value={stats.tours}
                color="emerald"
              />
              <StatCard
                icon={<Hotel className="text-indigo-600" />}
                label="Hotels"
                value={stats.hotels}
                color="indigo"
              />
              <StatCard
                icon={<BookOpenCheck className="text-pink-600" />}
                label="Bookings"
                value={stats.bookings}
                color="pink"
              />
            </div>

            {/* Optional: Future Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-6 rounded-xl shadow border">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Today's Bookings
                  </h2>
                  <CalendarDays className="text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {Math.floor(stats.bookings * 0.1) + 1}
                </p>
                <p className="text-sm text-gray-500">
                  Based on 10% of total bookings
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow border">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Quick Tips
                </h2>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Click the sidebar to manage resources.</li>
                  <li>Monitor bookings growth weekly.</li>
                  <li>Use search filters in each section.</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition">
      <div
        className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
