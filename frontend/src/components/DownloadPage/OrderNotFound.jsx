import React from "react";
import Footer from "../utils/Footer";
import { Link } from "react-router-dom";

const OrderNotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-4">
          Order Not Found
        </h1>
        <p className="text-lg text-center mb-4">
          We couldn't find your order. Please check your details and try again.
        </p>
        <p className="text-md text-center text-gray-600">
          If your payment has been deducted and you did not receive your order,
          please{" "}
          <Link
            to="/help"
            className="text-blue-600 underline"
          >
            contact us
          </Link>{" "}
          for assistance.
        </p>
      </div>
      <Footer/>
    </>
  );
};

export default OrderNotFound;
