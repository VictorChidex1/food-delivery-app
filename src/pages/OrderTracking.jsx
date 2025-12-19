import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  ChefHat,
  Truck,
  MapPin,
  Phone,
  MessageSquare,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

// IMPORT THE LOCAL RIDER IMAGE
import riderImage from "../assets/images/rider.webp";

// Fix for Leaflet default icon issues in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const OrderTracking = () => {
  // --- FIRESTORE INTEGRATION ---
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // MOCK RIDER PHONE NUMBER
  const RIDER_PHONE = "+2348012345678";

  useEffect(() => {
    if (!id) return;

    const orderRef = doc(db, "orders", id);
    const unsubscribe = onSnapshot(
      orderRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setOrderData(data);

          // Map status to steps
          let step = 1;
          if (data.status === "Preparing") step = 2;
          if (data.status === "On the Way") step = 3;
          if (data.status === "Delivered") step = 4;
          if (data.status === "Cancelled") step = 0; // Handle cancelled?

          setCurrentStep(step);
        } else {
          console.log("No such order!");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  // --- SIMULATION LOGIC (Updates Firestore) ---
  // In a real app, this would happen on the backend or rider app
  useEffect(() => {
    if (
      !orderData ||
      orderData.status === "Delivered" ||
      orderData.status === "Cancelled"
    )
      return;

    const timer = setInterval(async () => {
      const nextStatusMap = {
        Paid: "Preparing",
        Preparing: "On the Way",
        "On the Way": "Delivered",
      };

      const currentStatus = orderData.status;
      const nextStatus = nextStatusMap[currentStatus];

      if (nextStatus) {
        try {
          const orderRef = doc(db, "orders", id);
          await updateDoc(orderRef, { status: nextStatus });
        } catch (err) {
          console.error("Simulation update failed", err);
        }
      }
    }, 10000); // 10 seconds per step

    return () => clearInterval(timer);
  }, [orderData, id]);
  // --------------------------------

  const steps = [
    { id: 1, title: "Order Placed", desc: "Received", icon: Clock },
    { id: 2, title: "Preparing", desc: "Kitchen", icon: ChefHat },
    { id: 3, title: "On the Way", desc: "Rider", icon: Truck },
    { id: 4, title: "Delivered", desc: "Enjoy!", icon: CheckCircle },
  ];

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!orderData)
    return <div className="p-10 text-center">Order not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 1. FULL SCREEN MAP BACKGROUND */}
      <div className="absolute inset-0 h-[50vh] z-0">
        <MapContainer
          center={[6.5244, 3.3792]}
          zoom={13}
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          <Marker position={[6.5244, 3.3792]}>
            <Popup>Your Order is here!</Popup>
          </Marker>
        </MapContainer>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent z-[400]"></div>
      </div>

      {/* 2. FLOATING HEADER */}
      <div className="relative z-10 pt-6 px-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Link
            to="/orders"
            className="p-3 bg-white/90 backdrop-blur shadow-sm rounded-full hover:bg-white transition-all"
          >
            <ArrowLeft size={20} className="text-gray-800" />
          </Link>
          <div
            className={`px-4 py-2 backdrop-blur shadow-sm rounded-full text-xs font-bold ${
              currentStep === 4
                ? "bg-green-100 text-green-700"
                : "bg-white/90 text-gray-800"
            }`}
          >
            {currentStep === 4 ? "Order Delivered 🎉" : "Arriving in 15 mins"}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SHEET CONTENT */}
      <div className="relative z-10 mt-[32vh] pb-20 px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-2xl mx-auto bg-white rounded-[2rem] shadow-xl p-6 md:p-8 min-h-[50vh]"
        >
          {/* Handle Bar */}
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">
                {orderData.restaurant}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{orderData.items}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Order ID
              </p>
              <p className="font-mono text-sm font-bold text-gray-800">
                {orderData.id}
              </p>
            </div>
          </div>

          {/* PROGRESS TIMELINE */}
          <div className="relative mb-10">
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF5200]"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>

            <div className="flex justify-between relative">
              {steps.map((step) => {
                const isActive = step.id <= currentStep;
                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center gap-3 w-16"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor: isActive ? "#FF5200" : "#fff",
                        borderColor: isActive ? "#FF5200" : "#E5E7EB",
                        scale: step.id === currentStep ? 1.1 : 1,
                      }}
                      className="w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 transition-colors duration-500"
                    >
                      <step.icon
                        size={16}
                        className={isActive ? "text-white" : "text-gray-300"}
                      />
                    </motion.div>
                    <p
                      className={`text-[10px] font-bold text-center ${
                        isActive ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIDER CARD */}
          <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={riderImage}
                  alt="Rider"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Musa Abdul</h4>
                <p className="text-xs text-gray-500">
                  Your Rider • 4.9⭐ • Honda Bike
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {/* MESSAGE BUTTON (Opens SMS) */}
              <a
                href={`sms:${RIDER_PHONE}`}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 shadow-sm hover:text-orange-600 transition-colors"
              >
                <MessageSquare size={18} />
              </a>

              {/* CALL BUTTON (Opens Dialer) */}
              <a
                href={`tel:${RIDER_PHONE}`}
                className="w-10 h-10 rounded-full bg-[#FF5200] flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderTracking;
