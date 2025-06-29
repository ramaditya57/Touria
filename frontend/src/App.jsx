import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import TourList from "./pages/TourList";
import TourDetails from "./pages/TourDetails";
import FilteredTourList from "./pages/FilteredTourList";
import HotelList from "./pages/HotelList";
import HotelDetails from "./pages/HotelDetails";
import FlightList from "./pages/FlightList";
import BookingPage from "./pages/BookingPage";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FAQs from "./pages/FAQs";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTours from "./pages/AdminTours";
import AdminHotels from "./pages/AdminHotels";
// import AdminFlights from "./pages/AdminFlights";
import AdminBlogs from "./pages/AdminBlogs";
import AdminBookings from "./pages/AdminBookings";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import MyBookings from "./pages/MyBookings";

function App() {
  const isUser = () => {
    return (
      localStorage.getItem("token") && localStorage.getItem("role") === "user"
    );
  };

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/tours" element={<TourList />} /> */}
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/tours" element={<FilteredTourList />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/flights" element={<FlightList />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/tours" element={<AdminTours />} />
          <Route path="/admin/hotels" element={<AdminHotels />} />
          {/* <Route path="/admin/flights" element={<AdminFlights />} /> */}
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/cart"
            element={isUser() ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/payment"
            element={isUser() ? <PaymentPage /> : <Navigate to="/login" />}
          />
          <Route path="/bookings" element={<MyBookings />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
