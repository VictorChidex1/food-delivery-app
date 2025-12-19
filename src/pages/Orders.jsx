import React, { useState, useEffect } from "react";
import {
  Package,
  Clock,
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
  RotateCcw,
  XCircle,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useRestaurants from "../hooks/useRestaurants";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "sonner";

const Orders = () => {
  const { restaurants } = useRestaurants();
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Active");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- LOAD ORDERS FROM FIRESTORE ---
  useEffect(() => {
    if (!currentUser) {
      setOrders([]);
      setLoading(false);
      return;
    }

    // Query orders for current user
    const q = query(
      collection(db, "orders"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const userOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(userOrders);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        // Fallback for index errors or permission issues
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // --- ACTION HANDLERS ---

  // 1. CANCEL SINGLE ORDER
  const handleCancelOrder = async (e, orderId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, { status: "Cancelled" });
        toast.info("Order has been cancelled");
      } catch (error) {
        console.error("Error cancelling order:", error);
        toast.error("Failed to cancel order");
      }
    }
  };

  // 2. DELETE SINGLE ORDER FROM HISTORY
  const handleDeleteOrder = async (e, orderId) => {
    e.stopPropagation();
    if (window.confirm("Delete this order record permanently?")) {
      try {
        await deleteDoc(doc(db, "orders", orderId));
        toast.success("Order deleted");
      } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("Failed to delete order");
      }
    }
  };

  // 3. CLEAR ENTIRE HISTORY
  const handleClearHistory = async () => {
    if (
      window.confirm(
        "Are you sure you want to clear your entire order history? This cannot be undone."
      )
    ) {
      const pastOrders = orders.filter(
        (o) => o.status === "Delivered" || o.status === "Cancelled"
      );

      try {
        const deletePromises = pastOrders.map((order) =>
          deleteDoc(doc(db, "orders", order.id))
        );
        await Promise.all(deletePromises);
        toast.success("Order history cleared");
      } catch (error) {
        console.error("Error clearing history:", error);
        toast.error("Failed to clear history");
      }
    }
  };

  // Filter Logic
  const activeOrders = orders.filter(
    (o) => o.status !== "Delivered" && o.status !== "Cancelled"
  );
  const pastOrders = orders.filter(
    (o) => o.status === "Delivered" || o.status === "Cancelled"
  );

  const displayedOrders = activeTab === "Active" ? activeOrders : pastOrders;

  const getRestaurantImage = (name) => {
    const found = restaurants.find((r) => r.name === name);
    return found ? found.image : null;
  };

  const handleOrderClick = (orderId) => {
    // We used orderId (document ID) for saving, but displayed orderId (ref) in UI
    // The clickable route should probably use the document ID to easily fetch it in tracking
    // But earlier I saved a display ID 'orderId' like #FD-123.
    // Let's use the document ID for the route to be safe and consistent.
    navigate(`/tracking/${orderId}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 min-h-screen pb-24">
      {/* HEADER & TABS */}
      <div className="sticky top-0 bg-gray-50 z-10 pb-4 pt-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <h1 className="text-2xl font-extrabold text-gray-900">My Orders</h1>
          </div>

          {/* CLEAR HISTORY BUTTON - Only visible on History Tab if there are items */}
          {activeTab === "History" && pastOrders.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-red-500 text-xs font-bold bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 size={14} /> Clear History
            </button>
          )}
        </div>

        {/* Custom Tab Switcher */}
        <div className="bg-gray-200 p-1 rounded-xl flex gap-1">
          {["Active", "History"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="mt-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {displayedOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                No {activeTab.toLowerCase()} orders
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {activeTab === "Active"
                  ? "Hungry? Let's find you something delicious."
                  : "History is clean."}
              </p>
              <Link
                to="/"
                className="bg-[#FF5200] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600"
              >
                Browse Restaurants
              </Link>
            </motion.div>
          ) : (
            displayedOrders.map((order, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                key={order.id}
                onClick={() => handleOrderClick(order.id)}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="flex gap-4">
                  {/* Restaurant Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={
                        getRestaurantImage(order.restaurant) ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                      }
                      alt={order.restaurant}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">
                          {order.restaurant}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {order.items}
                        </p>
                      </div>
                      <span className="font-bold text-gray-900">
                        {order.price}
                      </span>
                    </div>

                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-medium">
                        {/* Status Badge */}
                        <span
                          className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-gray-400 flex items-center gap-1">
                          <Clock size={10} /> {order.date}
                        </span>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex items-center gap-3">
                        {/* ACTIVE TAB ACTIONS */}
                        {activeTab === "Active" && (
                          <>
                            <button
                              onClick={(e) => handleCancelOrder(e, order.id)}
                              className="text-red-500 text-xs font-bold hover:bg-red-50 px-2 py-1 rounded transition-colors flex items-center gap-1"
                            >
                              <XCircle size={14} /> Cancel
                            </button>
                            <div className="flex items-center gap-1 text-[#FF5200] text-xs font-bold pl-2 border-l border-gray-100">
                              Track <ChevronRight size={14} />
                            </div>
                          </>
                        )}

                        {/* HISTORY TAB ACTIONS */}
                        {activeTab === "History" && (
                          <>
                            <button
                              onClick={(e) => handleDeleteOrder(e, order.id)}
                              className="text-gray-400 text-xs font-bold hover:text-red-500 transition-colors flex items-center gap-1 mr-2"
                              title="Delete from history"
                            >
                              <Trash2 size={14} />
                            </button>
                            <button className="text-[#FF5200] text-xs font-bold flex items-center gap-1 hover:underline">
                              <RotateCcw size={12} /> Reorder
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Orders;
