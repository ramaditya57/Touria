import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  if (!state)
    return <p className="text-center mt-10 text-red-500">No payment data found</p>;

  const { subtotal, tax, discount, total, couponCode, items } = state;

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const bookingRequests = items.map(({ tour, hotel }) => {
        const item = tour || hotel;
        const type = tour ? "tour" : "hotel";

        return API.post(
          "/bookings",
          {
            item: item._id,
            type,
            date: new Date(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });

      await Promise.all(bookingRequests);

      alert("✅ Payment successful! Your bookings have been confirmed.");
      dispatch({ type: "CLEAR_CART" });
      navigate("/bookings");
    } catch (err) {
      console.error("❌ Booking failed:", err);
      alert("Payment succeeded, but booking failed. Please contact support.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800">Payment</h2>

      {/* Booking Summary */}
      <div className="bg-white shadow rounded-lg p-6 space-y-2">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Booking Summary</h3>

        {items.map(({ tour, hotel }) => {
          const item = tour || hotel;
          const title = item?.title || item?.name || "Untitled";

          return (
            <div key={item._id} className="border-b py-2 flex justify-between">
              <span className="text-gray-800">{title}</span>
              <span className="text-gray-600">₹{item.price || "N/A"}</span>
            </div>
          );
        })}

        <div className="pt-4 text-sm text-gray-700 space-y-1">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Tax (5%): ₹{tax}</p>
          {couponCode && (
            <p className="text-green-600">
              Coupon ({couponCode}): -₹{discount}
            </p>
          )}
          <p className="text-lg font-bold text-gray-800 pt-2">Total: ₹{total}</p>
        </div>
      </div>

      {/* Payment Form */}
      <div className="bg-white shadow rounded-lg p-6 !space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Enter Payment Details</h3>

        <input
          type="text"
          placeholder="Card Number"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Expiry MM/YY"
            className="w-1/2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-1/2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 !text-white font-semibold py-3 rounded-md hover:bg-green-700 transition"
        >
          Pay ₹{total} Now
        </button>
      </div>
    </div>
  );
}
