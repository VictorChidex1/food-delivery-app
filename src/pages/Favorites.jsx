import React, { useState, useEffect } from 'react';
import { Heart, Star, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { restaurants } from '../data/mockData'; 

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // LOAD FAVORITES
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavs);
  }, []);

  // REMOVE FROM FAVORITES
  const removeFavorite = (id) => {
    const updatedFavs = favorites.filter(favId => favId !== id);
    setFavorites(updatedFavs);
    localStorage.setItem('favorites', JSON.stringify(updatedFavs));
  };

  // Filter the main restaurant list to show only favorited ones
  const favoriteRestaurants = restaurants.filter(r => favorites.includes(r.id));

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-24">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-extrabold text-gray-900">My Favorites</h1>
      </div>

      {/* CONTENT */}
      <AnimatePresence>
        {favoriteRestaurants.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200"
          >
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <Heart size={40} className="text-red-400" fill="currentColor" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Favorites Yet</h2>
            <p className="text-gray-500 mb-6 max-w-xs">
              Tap the heart icon on restaurants you love to save them here.
            </p>
            <Link to="/" className="bg-[#FF5200] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-transform hover:scale-105 shadow-lg">
              Find Food
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {favoriteRestaurants.map((restaurant) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={restaurant.id}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-4 group"
              >
                <div 
                  onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                  className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 cursor-pointer"
                >
                  <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1 cursor-pointer" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>{restaurant.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{restaurant.categories[0]} • {restaurant.deliveryTime}</p>
                    </div>
                    <button 
                      onClick={() => removeFavorite(restaurant.id)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                    >
                      <Heart size={18} fill="currentColor" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-xs font-bold bg-green-50 text-green-700 px-2 py-1 rounded-md">
                      <Star size={10} fill="currentColor" /> {restaurant.rating}
                    </div>
                    <button 
                      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                      className="text-[#FF5200] text-xs font-bold flex items-center gap-1 hover:underline"
                    >
                      View Menu
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Favorites;