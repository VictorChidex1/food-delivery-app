import React from 'react';
import { Heart } from 'lucide-react';

const Favorites = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center py-20">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart size={40} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No Favorites Yet</h2>
      <p className="text-gray-500 mb-8">Start exploring restaurants and save your favorites here.</p>
      <button className="bg-[#FF5200] text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
        Find Food
      </button>
    </div>
  );
};

export default Favorites;