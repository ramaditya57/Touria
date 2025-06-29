import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="text-center p-10">
      <h1 className="text-5xl font-bold text-green-600 mb-4">404</h1>
      <p className="text-gray-600 mb-4">Page Not Found</p>
      <Link to="/" className="text-green-600 hover:underline">Go back home</Link>
    </div>
  );
}
