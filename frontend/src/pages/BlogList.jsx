import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/blogs")
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load blogs.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-green-600 text-lg py-10">Loading blogs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg py-10">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.h1
        className="text-4xl font-bold text-green-800 text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Travel Blogs
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-700 mb-1">{blog.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                {blog.snippet}
              </p>
              <Link
                to={`/blogs/${blog._id}`}
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
