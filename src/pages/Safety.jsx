import React from "react";
import {
  ShieldCheck,
  Truck,
  UserCheck,
  AlertTriangle,
  HeartPulse,
  PhoneCall,
} from "lucide-react";
import Footer from "../components/Footer";

// 1. IMPORT THE HERO IMAGE
// Make sure to save your downloaded image as 'safety-hero.jpg' in src/assets/images/
import heroBg from "../assets/images/safety-hero.png";

const Safety = () => {
  const safetyFeatures = [
    {
      id: 1,
      icon: ShieldCheck,
      title: "Food Safety Standards",
      description:
        "We partner only with restaurants that meet strict hygiene ratings. Regular audits ensure your food is prepared in a safe, clean environment.",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      id: 2,
      icon: Truck,
      title: "Contactless Delivery",
      description:
        "Choose 'Leave at door' at checkout for a completely contactless experience. Our riders are trained to maintain safe distances.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: 3,
      icon: UserCheck,
      title: "Rider Verification",
      description:
        "Every FoodFlow rider undergoes a rigorous background check and safety training program before they can deliver your first order.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      id: 4,
      icon: HeartPulse,
      title: "Health & Hygiene",
      description:
        "We provide sanitization kits to our riders and mandate regular health checks to ensure the community stays safe.",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col pt-20">
      {/* Added pt-20 to account for fixed header if needed, consistent with other pages */}

      {/* HERO HEADER */}
      <section className="relative bg-gray-900 text-white py-24 px-6 text-center overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Safety Center Hero"
            className="w-full h-full object-cover opacity-30" // Low opacity for text contrast
          />
          {/* Gradient Overlay for blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-50" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <ShieldCheck size={14} className="text-green-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Safety First
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Safety Center
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
            Your safety is our top priority. Learn how we ensure a secure and
            hygienic experience for every order.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20 flex-grow w-full pb-16">
        {/* Intro Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Committed to Your Well-being
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At FoodFlow, we believe that great food starts with trust. From the
            kitchen to your doorstep, we have implemented comprehensive safety
            measures to protect our customers, riders, and restaurant partners.
          </p>
        </div>

        {/* Safety Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {safetyFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex gap-5 items-start"
            >
              <div className={`${feature.bg} p-4 rounded-xl shrink-0`}>
                <feature.icon size={28} className={feature.color} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Section */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0">
              <AlertTriangle size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Report a Safety Concern
              </h3>
              <p className="text-gray-600 max-w-lg">
                If you felt unsafe during a delivery or noticed a hygiene issue,
                please report it immediately. Our safety team is available 24/7.
              </p>
            </div>
          </div>
          <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-red-200">
            <PhoneCall size={18} />
            Report Issue
          </button>
        </div>
      </div>

      {/* INTEGRATED FOOTER */}
      <Footer />
    </div>
  );
};

export default Safety;
