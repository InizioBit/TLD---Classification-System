import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
    </div>
  );
};

export default LoadingSpinner;
