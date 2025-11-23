import React from 'react';
import { CreditCard, Plus } from 'lucide-react';

const Wallet = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment Methods</h1>
      
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>
        <div className="relative z-10">
          <p className="text-sm text-gray-400 mb-1">Main Card</p>
          <p className="text-2xl font-mono mb-8">•••• •••• •••• 4242</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-400">Card Holder</p>
              <p className="font-bold">VICTOR CHIDEX</p>
            </div>
            <CreditCard size={32} className="opacity-80" />
          </div>
        </div>
      </div>

      <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-500 font-bold hover:border-orange-300 hover:text-orange-500 transition-all">
        <Plus size={20} />
        Add New Card
      </button>
    </div>
  );
};

export default Wallet;