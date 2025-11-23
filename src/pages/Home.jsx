import React from 'react';
import { restaurants } from '../data/mockData';
import { Star, Flame, Clock, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Home = () => {
  if (!restaurants || restaurants.length === 0) {
    return <div className="p-10 text-gray-800">Loading...</div>;
  }

  return (
    <div>
      <Hero />

      {/* 1. STICKY CATEGORY BAR */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-16 z-40 shadow-sm"> 
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="flex items-center gap-1 text-xs font-extrabold text-orange-600 bg-orange-50 px-3 py-1 rounded-full whitespace-nowrap border border-orange-100">
              <Flame size={14} fill="currentColor" />
              TRENDING
            </span>
            
            {["🔥 Jollof Rice", "🍖 Suya", "🍲 Pepper Soup", "🥣 Amala", "🥗 Abacha", "🍗 Grilled Chicken"].map((item, index) => (
              <motion.button 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 text-sm font-semibold transition-all border border-gray-200 hover:border-gray-300 whitespace-nowrap"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. VALUE PROPOSITION SECTION */}
      <div className="bg-orange-50 py-16 border-b border-orange-100/50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4 text-orange-500">
              <Clock size={32} />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Super Fast Delivery</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">From the kitchen to your doorstep in minutes. We value your time.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4 text-green-500">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-bold text-lg text-gray-900">100% Secure Payment</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">Pay with Card, Transfer or USSD. Your transactions are safe with us.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4 text-blue-500">
              <Truck size={32} />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Nationwide Reach</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">Whether you are in Lagos, Abuja or PH, we've got you covered.</p>
          </div>
        </motion.div>
      </div>

      {/* 3. MAIN RESTAURANT GRID */}
      <div className="p-4 max-w-7xl mx-auto pb-24 mt-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Restaurants near you</h2>
          <p className="text-gray-500 text-sm">
            {restaurants.length} curated spots delivering to your location
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {restaurants.map((restaurant) => (
            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="block group h-full">
               <motion.div 
                 variants={itemVariants}
                 whileHover={{ y: -5 }}
                 className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-100 h-full flex flex-col"
               >
                 <div className="relative h-56 overflow-hidden">
                   <img 
                     src={restaurant.image} 
                     alt={restaurant.name} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                     <Clock size={12} /> {restaurant.deliveryTime}
                   </div>
                   {restaurant.tags?.includes("Nationwide Delivery") && (
                     <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-md text-[10px] font-bold shadow-sm uppercase tracking-wider">
                       Nationwide
                     </div>
                   )}
                 </div>

                 <div className="p-5 flex-1 flex flex-col">
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#FF5200] transition-colors">{restaurant.name}</h3>
                     <div className="flex items-center bg-green-50 px-2 py-1 rounded text-green-700 text-xs font-bold border border-green-100">
                       <span className="mr-1">{restaurant.rating}</span>
                       <Star size={10} fill="currentColor" />
                     </div>
                   </div>
                   
                   <div className="flex items-center text-gray-500 text-sm mb-4">
                      <span className="truncate">{restaurant.categories.join(" • ")}</span>
                   </div>

                   <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-medium text-gray-400">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Truck size={14} /> Min: ₦{restaurant.minOrder.toLocaleString()}
                      </span>
                      <span className="text-[#FF5200] font-bold group-hover:underline">View Menu</span>
                   </div>
                 </div>
               </motion.div>
             </Link>
          ))}
        </motion.div>
      </div>

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;