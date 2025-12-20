import React from "react";

const Logo = ({ className = "", textColor = "text-gray-900" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 1. The Icon: Pin with a Fork inside */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Optional: Soft orange glow behind the logo for a premium feel */}
        <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-md scale-75 translate-y-1"></div>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          {/* The Pin Shape (Orange Body) */}
          <path
            d="M12 22C12 22 20 16 20 11C20 6.58172 16.4183 3 12 3C7.58172 3 4 6.58172 4 11C4 16 12 22 12 22Z"
            fill="#FF5200"
          />
          {/* The Fork Icon (White, sitting inside the pin) */}
          <path
            d="M12 14V17M12 6V11M9 6V11C9 12.6569 10.3431 14 12 14C13.6569 14 15 12.6569 15 11V6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Fork Handle Base */}
          <path
            d="M12 17V19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 2. The Typography */}
      <div className="flex flex-col justify-center -space-y-1">
        {/* Main Title: FoodFlow */}
        <div className="text-2xl font-extrabold tracking-tight leading-none font-sans">
          <span className={textColor}>Food</span>
          <span className="text-[#FF5200]">Flow</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
