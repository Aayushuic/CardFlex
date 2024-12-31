import React from "react";

const Modal = ({ isOpen, onClose, message, title, negative }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-full max-w-sm mx-4">
        <div className="mb-4">
          {negative ? (
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              className="cross"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                stroke="#e53e3e"
                strokeWidth="4"
                fill="none"
              />
              <line
                x1="18"
                y1="18"
                x2="32"
                y2="32"
                stroke="#e53e3e"
                strokeWidth="4"
              />
              <line
                x1="32"
                y1="18"
                x2="18"
                y2="32"
                stroke="#e53e3e"
                strokeWidth="4"
              />
            </svg>
          ) : (
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              className="tick"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                stroke="#4caf50"
                strokeWidth="4"
                fill="none"
              />
              <polyline
                points="15,25 22,32 35,18"
                stroke="#4caf50"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          )}
        </div>
        <h2
          className={`text-xl font-semibold mb-2 ${
            negative ? "text-red-600" : "text-green-600"
          }`}
        >
          {title}
        </h2>
        <p className="text-gray-700 text-center">{message}</p>
        <button
          className={`mt-4 py-2 px-4 rounded-lg transition duration-200 w-full ${
            negative
              ? "bg-red-600 hover:bg-red-500 text-white"
              : "bg-[#1B3C73] hover:bg-[#17305e] text-white"
          }`}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
