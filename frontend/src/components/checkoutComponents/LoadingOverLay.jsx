// /src/components/LoadingOverlay.jsx
import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="text-white text-2xl font-bold">
        <div className="flex items-center">
          <div className="dot-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <p className="ml-4">Processing Payment...</p>
        </div>
      </div>
      <style jsx>{`
        .dot-loader {
          display: flex;
          align-items: center;
        }

        .dot {
          width: 12px;
          height: 12px;
          margin: 0 4px;
          background-color: white;
          border-radius: 50%;
          animation: dot-flashing 1.5s infinite linear;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes dot-flashing {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
