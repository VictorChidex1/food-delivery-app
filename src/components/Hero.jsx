import React from 'react';
import heroImage from '../assets/images/hero-bg.png';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative w-full h-[850px] flex items-start justify-center overflow-hidden">
      
      {/* Background Image & Gradient */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src={heroImage} 
          alt="Delicious Naija Food Spread" 
          className="w-full h-full object-cover"
        />
        {/* Strong top gradient for clear text visibility against the sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent"></div>
      </motion.div>

      {/* Content Container - Drastically reduced padding to push text to the very top */}
      <div className="relative z-10 w-full max-w-[95%] mx-auto px-4 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-start gap-8"> 
        
        {/* LEFT SIDE: Title & Badge */}
        <div className="flex-1 text-left max-w-2xl">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-[#FF5200]/90 backdrop-blur-sm text-white text-xs md:text-sm font-bold shadow-xl tracking-widest uppercase transform hover:scale-105 transition-transform cursor-default border border-white/10">
              <span>🇳🇬</span> #1 Food Delivery in Nigeria
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-6xl md:text-8xl font-extrabold text-white leading-[0.9] tracking-tight drop-shadow-2xl"
          >
            Authentic <br />
            <span className="text-[#FF5200] text-shadow-sm">Naija Flavors.</span>
          </motion.h1>

        </div>

        {/* RIGHT SIDE: Description */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex-1 md:max-w-2xl text-left md:text-right pt-2"
        >
          <p className="text-white text-xl md:text-2xl font-semibold leading-snug drop-shadow-xl">
            From hot Amala in Ibadan to spicy Bole in PH. 
          </p>
          
          <p className="mt-2 text-gray-200 text-base md:text-lg font-medium leading-relaxed drop-shadow-md md:ml-auto">
            Order from the best local restaurants and get it delivered in minutes.
          </p>
          
          <div className="hidden md:block h-1.5 w-20 bg-[#FF5200] ml-auto mt-6 rounded-full shadow-lg opacity-90"></div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;