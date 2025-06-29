import React from "react";

const faqs = [
  { q: "How do I book a tour?", a: "You can book directly from our website or contact us." },
  { q: "Can I cancel my booking?", a: "Yes, refer to our cancellation policy." },
];

export default function FAQs() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">FAQs</h1>
      {faqs.map((faq, i) => (
        <div key={i} className="mb-4">
          <h3 className="font-semibold">{faq.q}</h3>
          <p className="text-gray-600">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}
