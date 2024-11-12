import React from "react";

const Modal = ({ isOpen, onClose, message,title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-full max-w-sm mx-4">
        <div className="animate-checkmark mb-4">
          <svg width="50" height="50" viewBox="0 0 50 50" className="tick">
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
        </div>
        <h2 className="text-xl font-semibold text-green-600 mb-2">{title}</h2>
        <p className="text-gray-700 text-center">{message}</p>
        <button
          className="mt-4 bg-[#1B3C73] text-white py-2 px-4 rounded-lg hover:bg-[#17305e] transition duration-200 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
