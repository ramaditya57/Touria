import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-4 py-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-green-500">Touria</span>. All rights reserved.
        </p>

        <div className="flex justify-center mt-3 space-x-6 text-lg">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-green-500 transition-colors duration-200"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-green-500 transition-colors duration-200"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-green-500 transition-colors duration-200"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
