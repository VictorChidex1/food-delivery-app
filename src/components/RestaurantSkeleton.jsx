import React from 'react';

const RestaurantSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 h-full flex flex-col shadow-sm">
      {/* Image Placeholder */}
      <div className="h-56 bg-gray-200 animate-pulse w-full relative">
        {/* Tag Placeholder */}
        <div className="absolute top-3 left-3 w-16 h-6 bg-gray-300 rounded-md"></div>
      </div>

      {/* Content Placeholder */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        
        {/* Title & Rating Row */}
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
        </div>

        {/* Categories Row */}
        <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse mb-2"></div>

        {/* Footer Row */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
          <div className="h-4 bg-gray-100 rounded w-24 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSkeleton;