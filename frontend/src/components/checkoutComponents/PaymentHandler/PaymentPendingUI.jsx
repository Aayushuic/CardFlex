import Lottie from "lottie-react";
import React, { useState, useEffect } from "react";
import paymentPendingAnimation from "@/assets/paymentPending.json";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentStatus } from "@/features/paymentSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PaymentPendingUI = ({ orderId, razorpay_order_id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  
  const checkPaymentStatus = async () => {
    try {
      if(attempts>2){
        dispatch(setPaymentStatus("failed"));
        return;
      }
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/payment/status/?orderId=${orderId}&razorpay_order_id=${razorpay_order_id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        dispatch(setPaymentStatus("success"));
        setTimeout(() => {
          navigate(
            `/download/${orderId}/verified/${data.razorpay_payment_id}`,
            { replace: true }
          );
        }, 3000);
      } else if (data.pending) {
        dispatch(setPaymentStatus("pending"));
      } else {
        dispatch(setPaymentStatus("failed"));
      }

      // Increment attempts after each check
      setAttempts((prev) => prev + 1);
    } catch (error) {
      dispatch(setPaymentStatus("failed"));
      console.error(error);
    }
  };

  const handleClick = () => {
    // Start the timer only if it's not already active
    if (!isTimerActive) {
      setIsTimerActive(true);
      setTimer(30); // Start the countdown from 30 seconds
    }
  };

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    } else if (timer === 0 && isTimerActive) {
      setIsTimerActive(false);
      checkPaymentStatus();
    }
  }, [isTimerActive, timer]);

  return (
    <div className="status-container text-center space-y-6 md:min-h-screen mt-8 md:-mt-9">
      <Lottie
        animationData={paymentPendingAnimation}
        loop
        className="w-full sm:w-200 lg:w-[500px]"
      />
      
      <div>
        <p className="text-lg sm:text-xl text-gray-700 md:mt-2">
          Payment Done. Click below to confirm payment status.
        </p>
        <Button
          onClick={handleClick}
          
          disabled={isTimerActive} // Disable button during countdown
          className="mt-4 px-6"
        >
          {isTimerActive && timer > 0
            ? `Please wait... ${timer}s remaining`
            : "Check Payment Status"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPendingUI;
