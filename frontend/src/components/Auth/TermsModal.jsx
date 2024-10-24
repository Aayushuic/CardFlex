import React from "react";
import { Link } from "react-router-dom"; // assuming you're using react-router for navigation

const TermsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-md shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Terms and Conditions</h2>
        <p className="text-sm mb-4">
          By using CardFlex, you agree to the following:
          <br />
          1. Use our services lawfully.
          <br />
          2. All content and trademarks are the property of CardFlex.
          <br />
          3. Payments are securely processed through Razorpay.
          <br />
          4. For custom orders, accurate information is required.
          <br />
          5. We are not liable for any indirect damages from service use.
          <br />
          6. These terms are subject to change, and you agree to comply with updates.
          <br />
          <Link to="/terms-and-conditions" className="text-blue-600 hover:underline">
            For more details, click here.
          </Link>
        </p>
        <button
          className=" text-white px-4 py-2 rounded bg-[#1B3C73] hover:bg-[#40679E]"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
