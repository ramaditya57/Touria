import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Tour from "./models/Tour.js";
import Hotel from "./models/Hotel.js";
import Blog from "./models/Blog.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("✅ MongoDB connected for seeding");

// 🌍 Sample image URLs
const googleImageURLs = {
  avatar: [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=4",
  ],
  tour: [
    "https://www.planetware.com/photos-large/F/france-paris-eiffel-tower.jpg",
    "https://www.planetware.com/photos-large/I/italy-rome-colosseum.jpg",
    "https://www.planetware.com/photos-large/JPN/japan-mt-fuji-and-cherry-blossoms.jpg",
    "https://www.planetware.com/photos-large/EGY/egypt-cairo-pyramids-of-giza-and%20camels-2.jpg",
    "https://www.planetware.com/wpimages/2024/06/switzerland-zermatt-attractions-town-center.jpg",
  ],
  hotel: [
    "https://images.unsplash.com/photo-1718506748678-8531c0b0357e?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1545175707-9eec1209f720?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1652348716053-3447e551dd1f?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1599722585837-c1cb8eea32ff?w=600&auto=format&fit=crop&q=60",
  ],
  blog: [
    "https://img.freepik.com/free-photo/flat-lay-travel-concept_23-2149070635.jpg",
    "https://img.freepik.com/premium-photo/travel-concept-with-travel-items-blue-background_185193-32000.jpg",
    "https://img.freepik.com/premium-photo/open-notebook-wooden-background-with-travel-accessories_410516-155.jpg",
  ],
};

// 👤 Users (admin, user, hotelOrg)
const seedUsers = [
  ...Array.from({ length: 5 }, (_, i) => ({
    name: `Admin User ${i + 1}`,
    email: `admin${i + 1}@touria.com`,
    password: bcrypt.hashSync(`admin${i + 1}`, 10),
    role: "admin",
    avatar: googleImageURLs.avatar[i % 4],
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    name: `User ${i + 1}`,
    email: `user${i + 1}@touria.com`,
    password: bcrypt.hashSync(`user${i + 1}`, 10),
    role: "user",
    avatar: googleImageURLs.avatar[i % 4],
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    name: `Hotel Org ${i + 1}`,
    email: `hotelorg${i + 1}@touria.com`,
    password: bcrypt.hashSync(`hotelorg${i + 1}`, 10),
    role: "hotelOrganization",
    avatar: googleImageURLs.avatar[i % 4],
  })),
];

// 🏝️ 20 tours
const tourData = [
  { title: "Eiffel Tower Experience", location: "Paris, France" },
  { title: "Roman Colosseum Tour", location: "Rome, Italy" },
  { title: "Mount Fuji Hike", location: "Tokyo, Japan" },
  { title: "Pyramids of Giza Safari", location: "Cairo, Egypt" },
  { title: "Matterhorn Adventure", location: "Zermatt, Switzerland" },
];

const seedTours = Array.from({ length: 20 }, (_, i) => {
  const t = tourData[i % tourData.length];
  return {
    title: t.title,
    description: `Join our unforgettable guided tour of ${t.title.toLowerCase()} in ${t.location}. All-inclusive and expertly planned.`,
    price: 1000 + (i % 5) * 250,
    location: t.location,
    image: googleImageURLs.tour[i % 5],
    gallery: [googleImageURLs.tour[i % 5], googleImageURLs.tour[(i + 1) % 5]],
  };
});

// 🏨 20 hotels (link to hotelOrganization)
const hotelData = [
  { name: "The Ritz Paris", location: "Paris, France" },
  { name: "Hotel Hassler Roma", location: "Rome, Italy" },
  { name: "The Peninsula Tokyo", location: "Tokyo, Japan" },
  { name: "Marriott Mena House", location: "Cairo, Egypt" },
  { name: "Grand Hotel Zermatterhof", location: "Zermatt, Switzerland" },
];

let hotelOrgUsers = [];

async function seedDB() {
  try {
    await User.deleteMany();
    await Tour.deleteMany();
    await Hotel.deleteMany();
    await Blog.deleteMany();

    const users = await User.insertMany(seedUsers);
    const hotelOrgs = users.filter(u => u.role === "hotelOrganization");
    hotelOrgUsers = hotelOrgs;

    const seedHotels = Array.from({ length: 20 }, (_, i) => {
      const h = hotelData[i % 5];
      return {
        name: h.name,
        location: h.location,
        description: `Stay at ${h.name}, a luxury hotel in ${h.location}. World-class service and breathtaking views.`,
        price: 200 + (i % 5) * 50,
        profileImage: googleImageURLs.hotel[i % 5],
        gallery: [googleImageURLs.hotel[i % 5], googleImageURLs.hotel[(i + 1) % 5]],
        hotelOrganization: hotelOrgUsers[i % hotelOrgUsers.length]._id,
      };
    });

    await Tour.insertMany(seedTours);
    await Hotel.insertMany(seedHotels);

    const blogTopics = [
      "How to Pack Smart",
      "Top 10 Budget Destinations",
      "Safety Tips Abroad",
      "Creating the Perfect Itinerary",
      "Must-Have Travel Apps",
    ];

    const seedBlogs = Array.from({ length: 20 }, (_, i) => {
      const topic = blogTopics[i % 5];
      return {
        title: topic,
        content: `Explore our expert tips on ${topic.toLowerCase()}. Make your next trip easier, safer, and more fun.`,
        excerpt: `Here's everything you need to know about ${topic.toLowerCase()}.`,
        author: `Admin User ${(i % 5) + 1}`,
        image: googleImageURLs.blog[i % 3],
      };
    });

    await Blog.insertMany(seedBlogs);

    console.log("✅ Seeding successful: Users, Tours, Hotels, Blogs added.");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedDB();
