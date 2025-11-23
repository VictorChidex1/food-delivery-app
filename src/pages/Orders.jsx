import React, { useState, useEffect } from 'react';
import { Package, Clock, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
// 1. IMPORT MOTION
import { motion } from 'framer-motion';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  // ---------------------------

  // LOAD ORDERS FROM LOCAL STORAGE
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6 pb-24"
    >
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-extrabold text-gray-900">My Orders</h1>
      </div>
      
      {orders.length === 0 ? (
        // EMPTY STATE
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200"
        >
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag size={40} className="text-orange-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6 max-w-xs">
            Looks like you haven't placed any orders yet. Hungry?
          </p>
          <Link to="/" className="bg-[#FF5200] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-transform hover:scale-105 shadow-lg shadow-orange-200/50">
            Start Ordering
          </Link>
        </motion.div>
      ) : (
        // ORDERS LIST
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {orders.map((order) => (
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              key={order.id} 
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer"
            >
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 group-hover:bg-[#FF5200] group-hover:text-white transition-colors">
                  <Package size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{order.restaurant}</h3>
                    <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded">{order.id}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1 mt-1">{order.items}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>{order.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
                <span className="font-bold text-gray-900">{order.price}</span>
                <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-50 text-blue-600'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  {order.status}
                </span>
                <ChevronRight size={16} className="text-gray-400 hidden md:block group-hover:translate-x-1 transition-transform" />
              </div>

            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Orders;