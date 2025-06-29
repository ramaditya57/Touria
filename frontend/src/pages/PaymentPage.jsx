import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  if (!state) return <p className="text-center mt-10">No payment data found</p>;

  const { subtotal, tax, discount, total, couponCode, items } = state;

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      // Create booking for each item
      // const bookingRequests = items.map(({ tour }) =>
      //   API.post(
      //     "/bookings",
      //     {
      //       item: tour._id,
      //       type: "tour",
      //       date: new Date(), // ✅ include date
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   )
      // );

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

      // Clear cart after successful booking
      dispatch({ type: "CLEAR_CART" });

      // Navigate to My Bookings
      navigate("/bookings");
    } catch (err) {
      console.error("❌ Booking failed:", err);
      alert("Payment succeeded, but booking failed. Please contact support.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Payment</h2>

      <div className="bg-white shadow p-4 rounded mb-4">
        <h3 className="text-xl font-semibold mb-2">Booking Summary</h3>
        {/* {items.map(({ tour }) => (
          <div key={tour._id} className="border-b py-2">
            <p>{tour.title}</p>
            <p className="text-sm text-gray-600">₹{tour.price}</p>
          </div>
        ))} */}
        {items.map(({ tour, hotel }) => {
          const item = tour || hotel;
          const title = item?.title || item?.name || "Untitled";

          return (
            <div key={item._id} className="border-b py-2">
              <p>{title}</p>
              <p className="text-sm text-gray-600">₹{item.price || "N/A"}</p>
            </div>
          );
        })}

        <div className="mt-2 text-sm text-gray-700">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Tax: ₹{tax}</p>
          {couponCode && (
            <p>
              Coupon ({couponCode}): -₹{discount}
            </p>
          )}
          <p className="font-bold text-lg">Total: ₹{total}</p>
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded">
        <h3 className="text-xl font-semibold mb-2">Enter Payment Details</h3>
        <input
          type="text"
          placeholder="Card Number"
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Expiry MM/YY"
            className="w-1/2 border px-3 py-2 rounded mb-2"
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-1/2 border px-3 py-2 rounded mb-2"
          />
        </div>
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Pay ₹{total} Now
        </button>
      </div>
    </div>
  );
}
