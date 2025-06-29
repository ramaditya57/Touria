import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const COUPONS = {
  TOURIA20: { type: "percent", value: 20 },
  WELCOME100: { type: "flat", value: 100 },
};

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState("");

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const subtotal = cart.items.reduce(
    (sum, { tour, hotel }) => sum + (tour?.price || hotel?.price || 0),
    0
  );

  const tax = Math.round(subtotal * 0.05);
  let discount = 0;

  if (appliedCoupon) {
    const { type, value } = appliedCoupon;
    discount = type === "percent" ? Math.round((value / 100) * subtotal) : value;
  }

  const total = subtotal + tax - discount;

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(COUPONS[code]);
      setError("");
    } else {
      setAppliedCoupon(null);
      setError("Invalid coupon code");
    }
  };

  const handleProceed = () => {
    navigate("/payment", {
      state: {
        subtotal,
        tax,
        discount,
        total,
        couponCode: appliedCoupon ? couponCode.trim().toUpperCase() : null,
        items: cart.items,
      },
    });
  };

  if (cart.items.length === 0) {
    return (
      <div className="text-center mt-20 space-y-4">
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <div className="flex items-center justify-center gap-4">
          <Link to="/tours" className="text-green-600 hover:underline">
            Browse Tours
          </Link>
          |
          <Link to="/bookings" className="text-green-600 hover:underline">
            My Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
        <Link
          to="/bookings"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          My Bookings
        </Link>
      </div>

      {/* Items */}
      <ul className="space-y-4">
        {cart.items.map(({ tour, hotel }) => {
          const item = tour || hotel;
          return (
            <li
              key={item._id}
              className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title || item.name}
                  className="w-20 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold text-lg">{item.title || item.name}</h4>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-green-700 font-semibold text-lg">₹{item.price}</span>
                <button
                  onClick={() => removeItem(item._id)}
                  className="!text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Summary */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
        <div className="space-y-1 text-sm text-gray-700">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Tax (5%): ₹{tax}</p>
          {appliedCoupon && (
            <p className="text-green-600">
              Coupon ({couponCode.toUpperCase()}): -₹{discount}
            </p>
          )}
        </div>
        <p className="font-bold text-lg text-gray-800 mt-4">Total: ₹{total}</p>

        {/* Coupon */}
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
          />
          <button
            onClick={applyCoupon}
            className="bg-green-600 !text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Apply
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          className="bg-red-600 !text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => dispatch({ type: "CLEAR_CART" })}
        >
          Clear Cart
        </button>
        <button
          className="bg-green-600 !text-white px-6 py-2 rounded hover:bg-green-700"
          onClick={handleProceed}
        >
          Proceed to Payment →
        </button>
      </div>
    </div>
  );
}
