import React, { useState } from 'react';
import { Plus, ArrowUpRight, ArrowDownLeft, Eye, EyeOff, Snowflake, Wallet as WalletIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Wallet = () => {
  const [balance, setBalance] = useState(25000);
  const [activeTab, setActiveTab] = useState('Transactions');
  const [showCardDetails, setShowCardDetails] = useState(false);

  // 1. CONVERT TRANSACTIONS TO STATE
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'debit', title: 'Order #FD-8832', date: 'Today, 2:30 PM', amount: 4500 },
    { id: 2, type: 'credit', title: 'Wallet Top Up', date: 'Yesterday', amount: 10000 },
    { id: 3, type: 'debit', title: 'Order #FD-4421', date: 'Nov 22, 2025', amount: 3200 },
  ]);

  // 2. UPDATED TOP UP FUNCTION
  const handleTopUp = () => {
    const amount = 5000;
    if (window.confirm(`Simulate adding ₦${amount.toLocaleString()} to wallet?`)) {
      setBalance(prev => prev + amount);
      const newTransaction = {
        id: Date.now(),
        type: 'credit',
        title: 'Wallet Top Up',
        date: 'Just Now',
        amount: amount
      };
      setTransactions(prev => [newTransaction, ...prev]);
      alert("Top Up Successful! 🚀");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen pb-24">
      
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">My Wallet</h1>

      {/* 1. BALANCE HEADER */}
      <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl mb-10 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-gray-400 text-sm font-medium mb-1">Total Balance</p>
          <h2 className="text-4xl font-extrabold mb-6">₦{balance.toLocaleString()}</h2>
          <div className="flex gap-4">
            <button onClick={handleTopUp} className="flex-1 bg-[#FF5200] hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]">
              <Plus size={18} /> Top Up
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF5200] rounded-full blur-3xl opacity-20 -translate-y-10 translate-x-10"></div>
      </div>

      {/* 2. REALISTIC ATM CARD SECTION */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-900">My Card</h3>
        </div>

        {/* 👇 HERE IS THE CHANGE: Wrapped in a constrained width container */}
        <div className="w-full max-w-sm mx-auto"> 
            
            {/* THE CARD UI */}
            <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-[#E6C88B] via-[#D4AF37] to-[#C5A028] p-6 shadow-2xl text-gray-800 overflow-hidden border border-[#C5A028]"
            >
                {/* Texture/Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                
                {/* Top Row */}
                <div className="flex justify-between items-center mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-800 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                        </div>
                        <span className="font-extrabold text-base tracking-tight text-gray-900">FoodFlow</span>
                    </div>
                    <div className="bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[8px] font-extrabold text-green-700 tracking-wider shadow-sm border border-white/50">
                        ACTIVE
                    </div>
                </div>

                {/* Middle Row: Chip */}
                <div className="mb-4 relative z-10 flex items-center gap-3">
                    <div className="w-9 h-7 bg-gradient-to-tr from-gray-300 to-gray-100 rounded-md border border-gray-400 flex relative overflow-hidden shadow-inner">
                        <div className="absolute top-1/2 w-full h-[1px] bg-gray-400"></div>
                        <div className="absolute left-1/2 h-full w-[1px] bg-gray-400"></div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
                        <path d="M8.5 10a7.5 7.5 0 0 1 7.5 7.5M5 10a11 11 0 0 1 11 11" strokeLinecap="round"/>
                    </svg>
                </div>

                {/* Bottom Row: Number & Details */}
                <div className="relative z-10 mt-auto">
                    <p className="font-bold text-[10px] uppercase tracking-wide mb-1 text-gray-800/80">Victor Chidex</p>
                    
                    <div className="flex justify-between items-end">
                        <div className="font-mono text-lg tracking-widest font-bold text-gray-900 drop-shadow-sm">
                            {showCardDetails ? "5177 4632 8901" : "5177 **** ****"}
                        </div>
                        <div className="flex -space-x-2 opacity-90">
                            <div className="w-6 h-6 rounded-full bg-[#EB001B]"></div>
                            <div className="w-6 h-6 rounded-full bg-[#F79E1B]"></div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-2 text-[10px] font-bold font-mono text-gray-800">
                        <span className="flex flex-col">
                            <span className="text-[6px] opacity-70">EXP</span>
                            {showCardDetails ? "12/28" : "**/**"}
                        </span>
                        <span className="flex flex-col">
                            <span className="text-[6px] opacity-70">CVV</span>
                            {showCardDetails ? "452" : "***"}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Card Actions */}
            <div className="flex justify-between items-center mt-4 px-1">
                <button 
                    onClick={() => setShowCardDetails(!showCardDetails)}
                    className="text-[#FF5200] text-xs font-bold hover:text-orange-700 flex items-center gap-1 transition-colors"
                >
                    {showCardDetails ? <EyeOff size={14} /> : <Eye size={14} />}
                    {showCardDetails ? "Hide" : "Show details"}
                </button>

                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors border border-gray-200">
                    <Snowflake size={12} /> Freeze
                </button>
            </div>
        </div>
        {/* 👆 END OF CARD WRAPPER */}

      </div>

      {/* 3. TRANSACTIONS TAB */}
      <div>
        <div className="flex gap-6 border-b border-gray-100 mb-6">
            <button className="pb-3 text-sm font-bold text-[#FF5200] relative">
                Recent Transactions
                <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5200]" />
            </button>
        </div>

        <div className="space-y-4">
            <AnimatePresence>
            {transactions.map((t) => (
            <motion.div 
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                key={t.id} 
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    t.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-orange-50 text-orange-600'
                }`}>
                    {t.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">{t.title}</h4>
                    <p className="text-xs text-gray-400">{t.date}</p>
                </div>
                </div>
                <span className={`font-bold text-sm ${t.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                {t.type === 'credit' ? '+' : '-'}₦{t.amount.toLocaleString()}
                </span>
            </motion.div>
            ))}
            </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default Wallet;