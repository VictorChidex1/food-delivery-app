import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Truck,
  User,
  ShieldAlert,
  Mail,
  MessageSquare,
} from "lucide-react";
import Footer from "../components/Footer";

// 1. IMPORT THE HERO IMAGE
// Make sure to save your downloaded image as 'help-hero.jpg' in this folder
import heroBg from "../assets/images/help-hero.png";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(null);

  const categories = [
    {
      icon: Truck,
      title: "Orders & Delivery",
      desc: "Track, cancel, or report issues.",
    },
    {
      icon: CreditCard,
      title: "Payments & Refunds",
      desc: "Transaction statuses and methods.",
    },
    {
      icon: User,
      title: "Account Settings",
      desc: "Profile, address, and password.",
    },
    {
      icon: ShieldAlert,
      title: "Safety & Security",
      desc: "Report incidents and safety tips.",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Where is my order?",
      answer:
        "You can track your order in real-time by going to the 'Orders' tab and selecting your active order. You will see a map with the rider's location.",
    },
    {
      id: 2,
      question: "How do I cancel an order?",
      answer:
        "Go to 'My Orders', select the active order, and click the 'Cancel Order' button. Note: You cannot cancel if the restaurant has already started preparing your food.",
    },
    {
      id: 3,
      question: "Can I pay with cash?",
      answer:
        "Yes! We support Pay on Delivery (Cash/Transfer) as well as online card payments via Paystack.",
    },
    {
      id: 4,
      question: "What if my food arrives cold or damaged?",
      answer:
        "We are sorry about that! Please take a picture and contact our support team immediately via the in-app chat. We will issue a refund or redeliver.",
    },
    {
      id: 5,
      question: "How do I become a rider?",
      answer:
        "Visit our Careers page linked in the footer and apply for the 'Delivery Rider Partner' role. You will need a valid bike license.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-20 flex flex-col">
      {/* 1. HERO SEARCH SECTION (Revamped with Image) */}
      <section className="relative bg-gray-900 text-white py-24 px-6 text-center overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Help Center Hero"
            className="w-full h-full object-cover opacity-30" // Lower opacity for better text contrast
          />
          {/* Gradient Overlay for blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold mb-4"
          >
            How can we help you?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 mb-8 text-lg"
          >
            Search for articles or browse topics below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="e.g. refund, late delivery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#FF5200]/50 shadow-lg"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY GRID */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 mb-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-[#FF5200] mx-auto mb-4">
                <cat.icon size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{cat.title}</h3>
              <p className="text-xs text-gray-500">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-6 mb-20 flex-grow w-full">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all shadow-sm hover:shadow-md"
            >
              <button
                onClick={() =>
                  setActiveQuestion(activeQuestion === faq.id ? null : faq.id)
                }
                className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                {faq.question}
                {activeQuestion === faq.id ? (
                  <ChevronUp size={20} className="text-[#FF5200]" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {activeQuestion === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 text-gray-600 text-sm leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No results found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. CONTACT CTA */}
      <section className="bg-orange-50 border-t border-orange-100 py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Still need help?
        </h2>
        <p className="text-gray-600 mb-8">
          Our support team is just a click away.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="flex items-center justify-center gap-2 bg-[#FF5200] text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
            <MessageSquare size={18} /> Chat with Support
          </button>
          <a
            href="mailto:support@foodflow.com"
            className="flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors"
          >
            <Mail size={18} /> Email Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
