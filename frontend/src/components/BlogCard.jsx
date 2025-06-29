import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300 overflow-hidden">
      <img
        src={blog.image}
        alt={blog.title}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-700 mb-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {blog.snippet}
        </p>
        <Link
          to={`/blogs/${blog._id}`}
          className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors duration-200"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
