import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const cartCount = cart.items.length;

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/tours", label: "Tours" },
    { path: "/hotels", label: "Hotels" },
    { path: "/blogs", label: "Blogs" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const activeClass = "bg-green-800 !text-white px-4 py-2 rounded-full";

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-md bg-white text-gray-800"
          : "bg-gradient-to-r from-emerald-500 via-green-500 to-green-600 !text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-green-900 font-bold text-3xl">
          Touria
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  isActive
                    ? activeClass
                    : "hover:bg-green-600 hover:!text-white px-4 py-2 rounded-full"
                } transition-colors duration-200`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {role === "user" && (
            <Link
              to="/cart"
              className="relative text-sm bg-green-800 !text-white px-4 py-2 rounded-full hover:scale-110 transition"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 !text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {role === "admin" ? (
            <Link
              to="/admin"
              className="text-sm bg-green-800 !text-white px-4 py-2 rounded-full hover:scale-110 transition"
            >
              Dashboard
            </Link>
          ) : null}

          {role ? (
            <button
              onClick={handleSignOut}
              className="text-sm bg-green-800 !text-white px-4 py-2 rounded-full hover:scale-110 transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-green-800 !text-white px-4 py-2 rounded-full hover:scale-110 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-green-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-4 py-3 shadow-inner space-y-2"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block ${
                    isActive
                      ? activeClass
                      : "text-black hover:bg-green-600 hover:!text-white px-4 py-2 rounded-full"
                  } transition-colors duration-200`}
                >
                  {link.label}
                </Link>
              );
            })}

            {role === "user" && (
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="relative block text-sm bg-green-800 !text-white px-4 py-2 rounded-full hover:scale-105 transition"
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 !text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="block text-sm bg-green-800 !text-white px-4 py-2 rounded-full hover:scale-110 transition"
              >
                Dashboard
              </Link>
            )}

            {role ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setOpen(false);
                }}
                className="block w-full text-left text-sm bg-green-800 !text-white px-4 py-2 rounded-full hover:scale-110 transition"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-sm bg-green-800 !text-white px-4 py-2 rounded-full hover:scale-110 transition"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}