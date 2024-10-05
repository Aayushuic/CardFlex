import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import { MdExpandMore } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const CouponCode = ({ setDiscountPercentage }) => {
  const [coupon, setCoupon] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti display
  const user = useSelector((state) => state.auth.user);

  const validCoupons = {
    WELCOME40: {
      discount: 40,
      description: "40% off for your first order",
    },
    DISCOUNT10: {
      discount: 10,
      description: "10% off for all registered users",
    },
  };

  const checkFirstOrder = async () => {
    try {
      const response = await fetch(`/api/user/order/check-first-order`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      });
      const data = await response.json();
      if (data.success) {
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error("Error checking order status");
      return false;
    }
  };

  const handleApplyCoupon = async () => {
    if (!user) {
      setError("Coupon are only available for registered user");
      return;
    }
    if (!coupon) {
      setError("Please enter coupon code");
      setDiscount(0);
      return;
    }

    setIsApplying(true);

    try {
      let isEligibleForFirstOrder = true;

      if (coupon === "WELCOME40") {
        isEligibleForFirstOrder = await checkFirstOrder();
      }

      if (coupon === "WELCOME40" && !isEligibleForFirstOrder) {
        setError("WELCOME40 can only be applied on your first order.");
        setIsApplying(false);
        return;
      }

      if (validCoupons[coupon]) {
        const discountValue = validCoupons[coupon].discount;
        setDiscountPercentage(discountValue);
        setDiscount(discountValue);
        setShowConfetti(true); // Show confetti on successful application
        setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
        setError(null);
      } else {
        setError("Invalid Coupon Code");
        setDiscount(0);
        setDiscountPercentage(0);
      }
    } catch (error) {
      setDiscount(0);
      setError("Error applying coupon. Please try again");
    } finally {
      setIsApplying(false);
    }
  };

  const confettiRef = useRef(null); // Reference for the confetti container

  return (
    <div className="p-0 sm:p-6 rounded-lg mt-7 relative">
      <h3 className="text-xl font-semibold mb-2 text-gray-700">
        Apply Coupon Code
      </h3>
      <div ref={confettiRef} className="relative">
        {/* Show Confetti when coupon is applied successfully */}
        {showConfetti && (
          <Confetti
            width={confettiRef.current?.clientWidth}
            height={confettiRef.current?.clientHeight}
          />
        )}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-pink-200"
            placeholder="Enter coupon code"
          />
          <button
            onClick={handleApplyCoupon}
            className={`px-5 py-2 rounded-md text-white font-medium transition ${
              isApplying
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            }`}
            disabled={isApplying}
          >
            {isApplying ? "Applying..." : "Apply"}
          </button>
        </div>
        {discount > 0 && (
          <p className="text-green-600 mt-2">
            Coupon applied! Discount: {discount}% off.
          </p>
        )}
        {error && <p className="text-red-600 mt-2">{error}</p>}
        <p className="text-sm text-gray-500 mt-4">
          Click on a coupon name to see details.
        </p>

        <div className="mt-6 p-4 bg-white rounded-md">
          <h4 className="text-md font-medium mb-3 text-gray-700">
            Available Coupons
          </h4>
          <ul className="space-y-3">
            {Object.entries(validCoupons).map(([code, details]) => (
              <li
                key={code}
                className="p-3 rounded-md shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
                onClick={() => {
                  setShowDetails(showDetails === code ? null : code); // Toggle details on click
                }}
              >
                <div className="flex items-center">
                  <MdExpandMore
                    className={`mr-2 transition-transform ${
                      showDetails === code ? "rotate-180" : ""
                    }`}
                  />
                  <span className="font-medium text-gray-800">{code}</span>
                </div>
                <span className="text-green-500 font-semibold">
                  {details.discount}% OFF
                </span>
              </li>
            ))}
          </ul>
          {showDetails && (
            <div className="mt-2 p-2 border border-green-200 rounded-md bg-green-100">
              <p className="text-sm text-gray-600">
                {validCoupons[showDetails].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponCode;
