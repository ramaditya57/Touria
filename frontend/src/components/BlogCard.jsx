import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  const image = blog?.image || "/placeholder-blog.jpg";
  const title = blog?.title || "Untitled Blog";
  const snippet = blog?.snippet || "No summary available.";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300 overflow-hidden">
      {/* Blog Image */}
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
        loading="lazy"
        onError={(e) => (e.target.src = "/placeholder-blog.jpg")}
      />

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-green-700 mb-2 truncate">{title}</h3>

        <p className="text-gray-600 text-sm mb-3 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {snippet}
        </p>

        <Link
          to={`/blogs/${blog?._id}`}
          className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors duration-200"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
