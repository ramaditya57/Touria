import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <h1 className="text-4xl font-bold text-green-800 text-center mb-6">
          About <span className="text-green-600">Touria</span>
        </h1>

        {/* Who we are */}
        <p className="text-gray-700 text-center max-w-3xl mx-auto text-lg mb-10">
          At <span className="font-semibold text-green-700">Touria</span>, we're more than a travel company —
          we're a team of explorers, creators, and planners dedicated to crafting seamless and memorable travel experiences.
          Whether you're looking for adventure, relaxation, or a cultural escape, we've got you covered.
        </p>

        {/* What we offer */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {[
            {
              title: "Custom Tour Packages",
              desc: "Tailored itineraries to fit your style, budget, and bucket list.",
            },
            {
              title: "Flight & Hotel Booking",
              desc: "Competitive pricing, flexible dates, and trusted partners worldwide.",
            },
            {
              title: "24/7 Travel Support",
              desc: "Our travel experts are with you before, during, and after your trip.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Our Journey Timeline */}
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Our Journey</h2>
        <div className="relative border-l-4 border-green-300 pl-6 space-y-8">
          {[
            {
              year: "2020",
              title: "Founded",
              desc: "Touria was born with a simple vision: to make travel easy, exciting, and accessible for everyone.",
            },
            {
              year: "2021",
              title: "Reached 10K+ Users",
              desc: "Within a year, thousands of travelers joined our platform and started exploring the world with us.",
            },
            {
              year: "2023",
              title: "Launched Mobile App",
              desc: "Our mobile app brought all travel services to users’ fingertips with real-time updates and booking.",
            },
            {
              year: "2024",
              title: "Expanded Globally",
              desc: "We started offering international packages, partnerships with global travel providers, and expanded our customer base.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -left-3.5 top-1.5 w-3 h-3 bg-green-600 rounded-full shadow-md" />
              <div className="pl-2">
                <p className="text-sm text-green-500 font-semibold">{step.year}</p>
                <h4 className="text-lg font-bold text-green-800">{step.title}</h4>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
