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

  // const subtotal = cart.items.reduce((sum, item) => sum + item.tour.price, 0);
  const subtotal = cart.items.reduce(
    (sum, { tour, hotel }) => sum + (tour?.price || hotel?.price || 0),
    0
  );

  const tax = Math.round(subtotal * 0.05); // 5% tax
  let discount = 0;

  if (appliedCoupon) {
    const { type, value } = appliedCoupon;
    discount =
      type === "percent" ? Math.round((value / 100) * subtotal) : value;
  }

  const total = subtotal + tax - discount;

  const applyCoupon = () => {
    const upper = couponCode.trim().toUpperCase();
    if (COUPONS[upper]) {
      setAppliedCoupon(COUPONS[upper]);
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
          </Link>{" "}
          |
          <Link to="/bookings" className="text-green-600 hover:underline">
            My Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
        <Link
          to="/bookings"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          My Bookings
        </Link>
      </div>

      <ul className="space-y-4 mb-6">
        {/* {cart.items.map(({ tour }) => (
          <li
            key={tour._id}
            className="flex items-center justify-between bg-white shadow p-4 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-20 h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-semibold">{tour.title}</h4>
                <p className="text-sm text-gray-600">{tour.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-green-700 font-bold">₹{tour.price}</span>
              <button
                onClick={() => removeItem(tour._id)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))} */}

        {cart.items.map(({ tour, hotel }) => {
          const item = tour || hotel;
          const type = tour ? "tour" : "hotel";
          return (
            <li
              key={item._id}
              className="flex items-center justify-between bg-white shadow p-4 rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title || item.name}
                  className="w-20 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{item.title || item.name}</h4>
                  <p className="text-sm text-gray-600">{item.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-green-700 font-bold">₹{item.price}</span>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Summary Section */}
      <div className="bg-white shadow p-4 rounded mb-4">
        <h3 className="text-xl font-semibold mb-2">Cart Summary</h3>
        <p className="text-sm text-gray-600">Subtotal: ₹{subtotal}</p>
        <p className="text-sm text-gray-600">Tax (5%): ₹{tax}</p>
        {appliedCoupon && (
          <p className="text-sm text-green-600">
            Coupon Applied ({couponCode.toUpperCase()}): -₹{discount}
          </p>
        )}
        <p className="font-bold text-gray-800 mt-2">Total: ₹{total}</p>

        {/* Coupon Input */}
        <div className="mt-4 flex gap-2 items-center">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="border rounded px-3 py-1"
          />
          <button
            onClick={applyCoupon}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            Apply
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => dispatch({ type: "CLEAR_CART" })}
        >
          Clear Cart
        </button>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          onClick={handleProceed}
        >
          Proceed to Payment →
        </button>
      </div>
    </div>
  );
}
