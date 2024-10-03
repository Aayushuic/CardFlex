import React from "react";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
   
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
       <h2 className="text-xl font-semibold mb-4">Message</h2>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-[#1B3C73] text-white rounded hover:bg-[#40679E]"
        >
         Okay
        </button>
        
      </div>
     
    </div>
  );
};

export default Modal;
