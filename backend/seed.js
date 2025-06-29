import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Tour from "./models/Tour.js";
import Hotel from "./models/Hotel.js";
import Blog from "./models/Blog.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected for seeding"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const googleImageURLs = {
  avatar: [
    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  ],
  tour: [
    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_92x30dp.png",
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
  ],
  hotel: [
    "https://www.google.com/images/branding/product/1x/drive_48dp.png",
    "https://www.google.com/images/branding/product/1x/photos_48dp.png",
  ],
  blog: [
    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_48x48dp.png",
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_48x48dp.png",
  ],
};

// 20 users (5 admins, 15 regular)
const seedUsers = Array.from({ length: 20 }, (_, i) => ({
  name: i < 5 ? `Admin User ${i + 1}` : `User ${i - 4}`,
  email: i < 5 ? `admin${i + 1}@example.com` : `user${i - 4}@example.com`,
  password: bcrypt.hashSync(i < 5 ? `admin${i + 1}` : `user${i - 4}`, 10),
  role: i < 5 ? "admin" : "user",
  avatar: googleImageURLs.avatar[i % googleImageURLs.avatar.length],
}));

// 20 tours
const tourLocations = ["Alps", "Bali", "Tokyo", "Rome", "Egypt"];
const seedTours = Array.from({ length: 20 }, (_, i) => {
  const loc = tourLocations[i % tourLocations.length];
  return {
    title: `${loc} Discovery Tour #${i + 1}`,
    description: `Explore the wonders of the ${loc} with our expert-led tour.`,
    price: 800 + i * 50,
    location: loc,
    image: googleImageURLs.tour[i % googleImageURLs.tour.length],
    gallery: [
      googleImageURLs.tour[(i + 0) % googleImageURLs.tour.length],
      googleImageURLs.tour[(i + 1) % googleImageURLs.tour.length],
    ],
  };
});

// 20 hotels
const hotelLocations = ["Zurich", "Bali", "Kyoto", "Milan", "Cairo"];

const seedHotels = Array.from({ length: 20 }, (_, i) => {
  const loc = hotelLocations[i % hotelLocations.length];
  return {
    name: `${loc} Hotel ${i + 1}`,
    location: loc,
    price: 100 + i * 10, // ✅ Use `price` instead of `pricePerNight`
    description: `A beautiful hotel in ${loc} offering comfort and luxury.`,
    image: googleImageURLs.hotel[i % googleImageURLs.hotel.length],
    gallery: [
      googleImageURLs.hotel[(i + 0) % googleImageURLs.hotel.length],
      googleImageURLs.hotel[(i + 1) % googleImageURLs.hotel.length],
    ],
  };
});


// 20 blogs
const blogTopics = ["Packing", "Budget", "Safety", "Itinerary", "Apps"];
const seedBlogs = Array.from({ length: 20 }, (_, i) => {
  const top = blogTopics[i % blogTopics.length];
  return {
    title: `Travel Tip #${i + 1}: ${top}`,
    content: `Improve your next journey with our insider tips on ${top.toLowerCase()}.`,
    author: `Admin User ${((i % 5) + 1)}`,
    image: googleImageURLs.blog[i % googleImageURLs.blog.length],
    excerpt: `Smart advice about ${top.toLowerCase()}...`,
  };
});

async function seedDB() {
  try {
    await User.deleteMany();
    await Tour.deleteMany();
    await Hotel.deleteMany();
    await Blog.deleteMany();

    await User.insertMany(seedUsers);
    await Tour.insertMany(seedTours);
    await Hotel.insertMany(seedHotels);
    await Blog.insertMany(seedBlogs);

    console.log("✅ Seeding completed: 20 users, tours, hotels & blogs inserted.");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedDB();
