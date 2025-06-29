import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center p-4">
      <p>&copy; {new Date().getFullYear()} Touria. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="hover:text-green-600"><i className="fab fa-facebook"></i></a>
        <a href="#" className="hover:text-green-600"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-green-600"><i className="fab fa-linkedin"></i></a>
      </div>
    </footer>
  );
}
