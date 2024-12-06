import { Button } from "@/components/ui/button";
import { fetchRazorpayKey, initiateRazorpay } from "@/hooks/checkoutUtils";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingOverlay from "../LoadingOverLay";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaRupeeSign,
  FaCheckCircle,
} from "react-icons/fa";
import Lottie from "lottie-react";
import paymentSuccessAnimation from "@/assets/paymentSuccess.json";
import orderNowAnimation from "@/assets/orderNow.json";
import { toast } from "sonner";
import PaymentFailedUi from "./PaymentFailedUi";
import Footer from "@/components/utils/Footer";
import PaymentPendingUI from "./PaymentPendingUI";

const HandlePaymentUI = () => {
  const [LoadingOverLay, setLoadingOverlay] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [countdown, setCountdown] = useState(35); // Countdown state
  const [attempts, setAttempts] = useState(0); // Track attempts
  const location = useLocation();
  const navigate = useNavigate();
  const { orderInstance } = location?.state || {};
  const { order_amount, name, email, phoneNumber, orderId, razorpay_order_id } =
    orderInstance || {};

  useEffect(() => {
    if (!location?.state?.orderInstance) {
      navigate("/", { replace: true }); // Redirect if no order or payment already successful
    }
  }, [orderInstance]);

  const checkPaymentStatus = async () => {
    try {
      setPaymentStatus("pending");
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
        setPaymentStatus("success");
        setTimeout(() => {
          navigate(
            `/download/${orderId}/verified/${data.razorpay_payment_id}`,
            { replace: true }
          );
        }, 3000);
      } else if (data.pending) {
        setPaymentStatus("pending");
      } else {
        setPaymentStatus("failed");
      }
    } catch (error) {
      setPaymentStatus("failed");
      console.error(error);
    }
  };

  useEffect(() => {
    if (paymentStatus === "pending" && attempts < 3) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1; // Decrease countdown
          } else {
            setAttempts((prevAttempts) => prevAttempts + 1);
            checkPaymentStatus();
            return 35; // Reset countdown to 30 seconds
          }
        });
      }, 1000);

      // Stop polling if attempts exceed 3
      if (attempts >= 4) {
        setPaymentStatus("failed");
        clearInterval(intervalId);
      }

      return () => clearInterval(intervalId);
    }
  }, [attempts, countdown, paymentStatus]);

  const handlePayment = async () => {
    try {
      setLoadingOverlay(true);
      const razorpayKey = await fetchRazorpayKey();
      const options = {
        key: razorpayKey,
        amount: order_amount,
        currency: "INR",
        name: "CardFlex",
        description: "Thank you for choosing CardFlex!",
        image:
          "https://res.cloudinary.com/dpx4mvnkp/image/upload/v1730016310/android-chrome-512x512_pw2tlc.png",
        order_id: razorpay_order_id,
        callback_url: `${
          import.meta.env.VITE_BACKEND_URL
        }/payment/payment-verification?secret=${orderId}`,
        handler: function (response) {
          fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/payment/payment-verification?secret=${orderId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                handler: true,
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setPaymentStatus("success");
                setTimeout(() => {
                  navigate(
                    `/download/${data.order}/verified/${data.razorpay_payment_id}`,
                    { replace: true }
                  );
                }, 3000);
              } else {
                setPaymentStatus("failed");
              }
            })
            .catch((error) => {
              setPaymentStatus("failed");
              console.error(error);
            });
        },
        prefill: {
          name: name,
          email: email,
          contact: phoneNumber,
        },
        theme: {
          color: "#1B3C73",
        },
        modal: {
          ondismiss: function () {
            checkPaymentStatus();
          },
        },
      };
      initiateRazorpay(options);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingOverlay(false);
    }
  };

  return (
    <>
      <div className="payment-container flex flex-col items-center justify-center p-6 ">
        {LoadingOverLay && <LoadingOverlay text={"processing payment.."} />}
        {orderInstance ? (
          <>
            {paymentStatus === "pending" && (
              <PaymentPendingUI
                countdown={countdown}
                attempts={attempts}
              ></PaymentPendingUI>
            )}
            {paymentStatus === "failed" && <PaymentFailedUi />}
            {paymentStatus === "success" && (
              <div className="status-container flex items-center justify-center ">
                <div className="max-w-4xl w-full p-6 lg:p-10 flex flex-col items-center text-center">
                  {/* Animation */}
                  <div className="w-3/4 max-w-xs sm:max-w-md lg:max-w-lg">
                    <Lottie animationData={paymentSuccessAnimation} loop={5} />
                  </div>

                  {/* Success Message */}
                  <p className="text-lg sm:text-2xl lg:text-3xl text-green-600 mt-6 font-semibold">
                    Payment Successful!
                  </p>

                  {/* Redirecting Text */}
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 mt-2">
                    Redirecting, Please wait...
                  </p>
                </div>
              </div>
            )}
            {paymentStatus === null && (
              <div className="order-summary p-5 sm:p-8 lg:p-10 w-full max-w-2xl">
                <h2
                  id="latest-design-heading"
                  className="text-center mb-4 relative text-xl md:text-3xl lg:text-4xl"
                >
                  <span className="block text-3xl md:text-5xl font-bold text-[#1B3C73] leading-snug">
                    <span className="block">
                      Time
                      <span className="text-4xl md:text-6xl text-[#FF6347] inline-block transform rotate-2 ml-2">
                        is
                      </span>
                    </span>
                    <span className="block mt-1 md:mt-0">
                      Running
                      <span className="text-3xl md:text-5xl text-[#FFD700] inline-block transform -rotate-2 ml-4">
                        Fast
                      </span>
                      <span className="ml-4">Hurry up and Order!</span>
                    </span>
                  </span>
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Lottie
                    animationData={orderNowAnimation}
                    loop
                    className="w-32 sm:w-48 lg:w-64 hidden sm:block"
                  />
                  <div className="mt-4 space-y-4">
                    <p className="flex items-center text-gray-700 text-lg">
                      <FaUser className="text-blue-600 w-6 h-6 mr-2" />
                      <strong>{name}</strong>
                    </p>
                    <p className="flex items-center text-gray-700 text-lg">
                      <FaPhoneAlt className="text-blue-600 w-6 h-6 mr-2" />
                      <strong>{phoneNumber}</strong>
                    </p>
                    <p className="flex items-center text-gray-700 text-lg">
                      <FaEnvelope className="text-blue-600 w-6 h-6 mr-2" />
                      <strong>{email}</strong>
                    </p>
                    <p className="flex items-center text-gray-700 text-lg">
                      <FaRupeeSign className="text-green-500 w-6 h-6 mr-2" />
                      <strong> {order_amount.toFixed(2)}</strong>
                    </p>
                  </div>
                </div>
                <div className="action-container flex flex-col items-center mt-6">
                  <Button
                    className="bg-green-500 text-white px-12 py-4 rounded-lg text-lg font-semibold  hover:bg-green-600  flex items-center"
                    onClick={handlePayment}
                  >
                    <FaCheckCircle className="mr-2" /> Proceed to Payment
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-600 text-center text-xl">
            Loading order details...
          </p>
        )}
      </div>
      {paymentStatus != "success" && <Footer />}
    </>
  );
};

export default HandlePaymentUI;
