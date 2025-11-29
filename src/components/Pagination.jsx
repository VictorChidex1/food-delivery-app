// src/components/Pagination.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange, // This will be the function to change pages
}) => {
  // If there is only 1 page, don't show pagination at all
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      {/* PREVIOUS BUTTON */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-[#FF5200] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        <ChevronLeft size={20} />
      </button>

      {/* PAGE NUMBERS */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
              currentPage === number
                ? "bg-[#FF5200] text-white shadow-md scale-110"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF5200] hover:text-[#FF5200]"
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* NEXT BUTTON */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-[#FF5200] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
