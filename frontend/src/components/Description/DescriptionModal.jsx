import React from "react";

const Modal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div className="max-w-4xl max-h-full p-4">
        <img
          src={imageSrc}
          alt="Full view"
          className="rounded-lg shadow-xl object-contain w-full h-full"
        />
      </div>
    </div>
  );
};

export default Modal;
