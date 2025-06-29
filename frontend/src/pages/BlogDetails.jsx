import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load blog.");
      });
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!blog) {
    return <p className="text-center text-green-600 mt-10">Loading blog...</p>;
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cover Image */}
      <motion.img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-xl mb-6 shadow"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Title */}
      <h1 className="text-4xl font-bold text-green-800 mb-4">{blog.title}</h1>

      {/* Optional metadata */}
      <div className="text-sm text-gray-500 mb-6">
        <span>By Touria Travel Team</span> · <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Content */}
      <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
        {blog.content}
      </div>
    </motion.div>
  );
}
