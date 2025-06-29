import React from "react";

export default function Gallery() {
  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"]; // Replace with actual images

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <img key={idx} src={src} alt={`Gallery ${idx}`} className="w-full h-48 object-cover rounded" />
        ))}
      </div>
    </div>
  );
}
