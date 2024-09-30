import React from "react";

const CardSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg animate-pulse">
      <div className="w-full h-64 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4 space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-5 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
      <div className="p-4 flex space-x-2">
        <div className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>
      {/* Optional: Add shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 opacity-30 animate-pulse"></div>
    </div>
  );
};

export default CardSkeleton;
