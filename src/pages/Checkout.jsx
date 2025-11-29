import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { restaurants } from "../data/mockData";
import {
  MapPin,
  CreditCard,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  Wallet,
  Banknote,
  Crosshair,
  Save,
  CheckCircle,
  Trash2, // Added Trash Icon
} from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PaystackPop from "@paystack/inline-js";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// --- LEAFLET ICON FIX ---
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return position === null ? null : <Marker position={position}></Marker>;
};

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [restaurant, setRestaurant] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [user, setUser] = useState(null);

  // UI States
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastOrderRef, setLastOrderRef] = useState("");

  const [address, setAddress] = useState(
    "12 Admiralty Way, Lekki Phase 1, Lagos"
  );
  const [mapPosition, setMapPosition] = useState({ lat: 6.5244, lng: 3.3792 });

  const DELIVERY_FEE = 1500;
  const SERVICE_FEE = 500;
  const PAYSTACK_PUBLIC_KEY =
    "pk_test_3380e881cd6db95ffe93cc1e8bf97d0c1737c571";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // --- 1. ROBUST INITIAL LOAD (Fixes Ghost Cart) ---
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Load Cart
    const savedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    const cartKeys = Object.keys(savedCart);

    if (cartKeys.length > 0) {
      const firstItemId = parseInt(cartKeys[0]);

      // Find restaurant that owns this item
      const foundRest = restaurants.find((r) =>
        r.menu?.some((m) => m.id === firstItemId)
      );

      if (foundRest) {
        setRestaurant(foundRest);
        setCart(savedCart);
      } else {
        // CORRUPTION DETECTED: The item in cart doesn't exist in our data.
        // Auto-clear to prevent the app from breaking.
        console.warn("Found invalid items in cart. Clearing...");
        localStorage.removeItem("cart");
        setCart({});
        // Dispatch storage event to update header
        window.dispatchEvent(new Event("storage"));
      }
    }
  }, []);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapPosition({ lat: latitude, lng: longitude });
          setAddress(
            `Pinned Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
          );
          toast.success("Location updated");
        },
        () => {
          toast.error("Could not access location");
        }
      );
    }
  };

  const subtotal = Object.keys(cart).reduce((total, itemId) => {
    const item = restaurant?.menu.find((i) => i.id === parseInt(itemId));
    return total + (item ? item.price * cart[itemId] : 0);
  }, 0);

  const total = subtotal + DELIVERY_FEE + SERVICE_FEE;

  // --- 2. SAFE PROCESS ORDER (Prevents Crashing) ---
  const processOrder = (reference) => {
    if (!restaurant) return;

    try {
      // SAFE MAPPING: Check if item exists before accessing .name
      const itemsSummary = Object.keys(cart)
        .map((id) => {
          const item = restaurant.menu.find((i) => i.id === parseInt(id));
          return item ? `${cart[id]}x ${item.name}` : null;
        })
        .filter(Boolean) // Remove any nulls (invalid items)
        .join(", ");

      const newOrderRef = `#FD-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder = {
        id: newOrderRef,
        restaurant: restaurant.name,
        items: itemsSummary,
        price: `₦${total.toLocaleString()}`,
        status: "Paid",
        paymentRef: reference,
        date: new Date().toLocaleDateString(),
        deliveryAddress: address,
        timestamp: Date.now(),
      };

      // Save to Local Storage
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // Update UI
      setLastOrderRef(newOrderRef);
      setShowSuccessModal(true); // Show Modal

      // Clear Cart
      localStorage.removeItem("cart");
      setCart({});

      // Notify other components
      toast.success("Order Placed Successfully!");
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Order Save Failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const finalizeAndNavigate = () => {
    if (lastOrderRef) {
      navigate(`/tracking/${encodeURIComponent(lastOrderRef)}`);
    } else {
      navigate("/orders");
    }
  };

  const handlePayWithPaystack = () => {
    if (!user?.email) {
      toast.error("Please log in to continue");
      return;
    }

    try {
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: PAYSTACK_PUBLIC_KEY,
        email: user.email,
        amount: total * 100,
        currency: "NGN",
        onSuccess: (transaction) => {
          processOrder(transaction.reference);
        },
        onCancel: () => {
          toast.error("Payment cancelled");
        },
      });
    } catch (error) {
      console.error("Paystack Error:", error);
      toast.error("Payment initialization failed");
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "card") {
      handlePayWithPaystack();
    } else {
      processOrder("PAY-ON-DELIVERY");
    }
  };

  // --- MANUAL CLEAR CART FUNCTION ---
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart({});
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  // --- EMPTY STATE HANDLING ---
  if ((!restaurant || Object.keys(cart).length === 0) && !showSuccessModal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100">
          <ShoppingBag size={32} className="text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#FF5200] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
          >
            Browse Restaurants
          </button>

          {/* Debugging Button: If user is stuck with ghost data but restaurant is null */}
          <button
            onClick={clearCart}
            className="mt-4 text-xs text-gray-400 hover:text-red-500 underline"
          >
            Clear Glitched Cart Data
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER MAIN CHECKOUT ---
  return (
    <>
      {!showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gray-50 py-8 px-4 pb-32 md:pb-12 relative"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Checkout
              </h1>
              <button
                onClick={clearCart}
                className="text-red-500 text-sm font-bold flex items-center gap-1 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Trash2 size={16} /> Clear Cart
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* LEFT COLUMN */}
              <div className="md:col-span-2 space-y-6">
                {/* ADDRESS SECTION */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                      <MapPin size={20} className="text-orange-500" /> Delivery
                      Details
                    </h2>
                    {!isEditingAddress && (
                      <button
                        onClick={() => setIsEditingAddress(true)}
                        className="text-[#FF5200] text-xs font-bold hover:underline"
                      >
                        Change
                      </button>
                    )}
                  </div>

                  {isEditingAddress ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none text-sm"
                      />
                      <div className="h-48 w-full rounded-lg overflow-hidden border border-gray-200 relative z-0">
                        <MapContainer
                          center={mapPosition}
                          zoom={13}
                          scrollWheelZoom={false}
                          className="h-full w-full"
                        >
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          <LocationMarker
                            position={mapPosition}
                            setPosition={setMapPosition}
                          />
                        </MapContainer>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleUseCurrentLocation}
                          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-200"
                        >
                          <Crosshair size={14} /> Use Current Location
                        </button>
                        <button
                          onClick={() => setIsEditingAddress(false)}
                          className="flex-1 bg-black text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800"
                        >
                          <Save size={14} /> Save Address
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                      <p className="font-bold text-gray-800">
                        Delivery Address
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{address}</p>
                    </div>
                  )}
                </div>

                {/* PAYMENT METHOD */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Wallet size={20} className="text-orange-500" /> Payment
                    Method
                  </h2>
                  <div className="space-y-3">
                    {["card", "transfer", "cash"].map((method) => (
                      <label
                        key={method}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === method
                            ? "border-[#FF5200] bg-orange-50 ring-1 ring-orange-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === method}
                            onChange={() => setPaymentMethod(method)}
                            className="text-[#FF5200] focus:ring-[#FF5200]"
                          />
                          <div className="flex items-center gap-2">
                            {method === "card" && (
                              <CreditCard size={18} className="text-gray-500" />
                            )}
                            {method === "transfer" && (
                              <Banknote size={18} className="text-gray-500" />
                            )}
                            {method === "cash" && (
                              <Banknote size={18} className="text-green-600" />
                            )}
                            <span className="font-medium text-gray-800 capitalize">
                              {method === "cash"
                                ? "Pay on Delivery"
                                : method === "transfer"
                                ? "Bank Transfer"
                                : "Pay with Paystack"}
                            </span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - ORDER SUMMARY */}
              <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                  <h2 className="font-bold text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4 mb-6 max-h-80 overflow-y-auto custom-scrollbar pr-1"
                  >
                    {Object.keys(cart).map((itemId) => {
                      const item = restaurant.menu.find(
                        (i) => i.id === parseInt(itemId)
                      );
                      // Skip invalid items instead of crashing
                      if (!item) return null;
                      return (
                        <motion.div
                          variants={itemVariants}
                          key={itemId}
                          className="flex items-center justify-between gap-3 border-b border-gray-50 pb-3 last:border-0"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm font-bold text-gray-800 line-clamp-1">
                                {item.name}
                              </p>
                              <p className="text-xs text-orange-600 font-bold">
                                {cart[itemId]}x
                              </p>
                            </div>
                          </div>
                          <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                            ₦{(item.price * cart[itemId]).toLocaleString()}
                          </span>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Delivery Fee</span>
                      <span>₦{DELIVERY_FEE.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Service Fee</span>
                      <span>₦{SERVICE_FEE.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-extrabold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                      <span>Total</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlaceOrder}
                    className="w-full bg-[#FF5200] text-white py-4 rounded-xl font-bold mt-6 hover:bg-orange-600 shadow-lg flex items-center justify-center gap-2"
                  >
                    {paymentMethod === "card"
                      ? `Pay ₦${total.toLocaleString()}`
                      : "Place Order"}{" "}
                    <ChevronRight size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={finalizeAndNavigate}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white w-full max-w-sm rounded-3xl p-8 relative z-[100] text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: 0.2,
                  }}
                >
                  <CheckCircle
                    size={40}
                    className="text-green-600"
                    strokeWidth={3}
                  />
                </motion.div>
              </div>

              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                Order Placed!
              </h2>
              <p className="text-gray-500 mb-6">
                Your order{" "}
                <span className="font-bold text-gray-800">{lastOrderRef}</span>{" "}
                has been successfully placed.
              </p>

              <button
                onClick={finalizeAndNavigate}
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-black transition-colors cursor-pointer"
              >
                Track Order
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Checkout;
