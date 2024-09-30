import React from "react";
import { MdPayment } from "react-icons/md";
import { FaCreditCard, FaWallet } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";

const PaymentInfo = () => {
  return (
    <div className="p-6 bg-white  rounded-lg  dark:bg-gray-800 dark:border-gray-700">
      
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        We accept the following payment methods:
      </p>
      <ul className="list-disc list-inside mt-4 space-y-3 text-gray-700 dark:text-gray-300">
        <li className="flex items-center space-x-3">
          <MdPayment size={24} className="text-blue-600" />
          <span className="text-lg font-medium">UPI</span>
        </li>
        <li className="flex items-center space-x-3">
          <FaCreditCard size={24} className="text-blue-600" />
          <span className="text-lg font-medium">Credit/Debit Cards</span>
        </li>
        <li className="flex items-center space-x-3">
          <FaWallet size={24} className="text-green-600" />
          <span className="text-lg font-medium">Wallets</span>
        </li>
      </ul>
      <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200 flex items-center">
        <IoShieldCheckmark size={28} className="text-green-600 mr-3" />
        <div>
          <p className="text-lg font-semibold text-green-800 dark:text-green-100">
            Secured by Razorpay
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Your payment is secure and protected through our payment gateway.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
