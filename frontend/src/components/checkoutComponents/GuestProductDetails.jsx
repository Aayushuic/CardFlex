// /src/components/Checkout/GuestProductDetails.jsx
import React from "react";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const GuestProductDetails = ({ product, handleDescriptionPageClick }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div>
        {product ? (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b dark:border-gray-700">
              <div
                className="flex items-center space-x-4 md:space-x-6 cursor-pointer"
                onClick={handleDescriptionPageClick}
              >
                <img
                  src={product?.imageSrc}
                  alt={product?.title}
                  className="w-16 h-16 object-fit rounded-lg shadow-md md:w-24 md:h-24"
                />
                <div>
                  <h3 className="text-lg font-semibold">{product?.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    ₹{product?.newPrice}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 border-t pt-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                ₹{product?.newPrice}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 py-10">
            <BsCartX className="text-6xl text-pink-500" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Your cart is empty.
            </p>
            <Link to="/">
              <Button variant="outline">Browse Now</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestProductDetails;
