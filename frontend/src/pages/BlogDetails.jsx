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

  const image = blog.image || "/placeholder-blog.jpg";
  const title = blog.title || "Untitled Blog";
  const content = blog.content || "No content available.";
  const date = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cover Image */}
      <motion.img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
        onError={(e) => (e.target.src = "/placeholder-blog.jpg")}
        loading="lazy"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-green-800 mb-2">{title}</h1>

      {/* Metadata */}
      <div className="text-sm text-gray-500 mb-6">
        <span>By <strong>Touria Travel Team</strong></span> · <span>{date}</span>
      </div>

      {/* Blog Content */}
      <div className="text-gray-700 leading-relaxed text-[17px] whitespace-pre-line tracking-wide">
        {content}
      </div>
    </motion.div>
  );
}
