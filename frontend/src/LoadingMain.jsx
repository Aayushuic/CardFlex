import "./index.css";
import React from "react";

const LoadingMain = () => {
  return (
    <div className="loading-dots-container">
      <div className="dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="loading-text">Please wait...</p>
    </div>
  );
};

export default LoadingMain;
