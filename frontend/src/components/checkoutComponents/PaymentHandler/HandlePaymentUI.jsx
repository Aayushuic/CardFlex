import { Button } from "@/components/ui/button";
import { fetchRazorpayKey, initiateRazorpay } from "@/hooks/checkoutUtils";
import React, { useEffect, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOrder, setPaymentStatus } from "@/features/paymentSlice";
import { Loader2 } from "lucide-react";
import useCancelOrder from "../../../hooks/useCancelOrder";
import { MdCancel } from "react-icons/md";
// import useCancelOrder from "";

const HandlePaymentUI = () => {
  const [LoadingOverLay, setLoadingOverlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currOrder = useSelector((state) => state.payment.currentOrder);
  const paymentStatus = useSelector((state) => state.payment.paymentStatus);
  const orderInstance = currOrder;
  const { cancelOrder } = useCancelOrder();
  const {
    order_amount,
    name,
    email,
    phoneNumber,
    orderId,
    razorpay_order_id,
    discount,
  } = orderInstance || {};

  const handlePayment = async () => {
    try {
      setLoadingOverlay(true);
      dispatch(setPaymentStatus("pending"));
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
            dispatch(setPaymentStatus(null));
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
                orderId={orderId}
                razorpay_order_id={razorpay_order_id}
              ></PaymentPendingUI>
            )}
            {paymentStatus === "failed" && <PaymentFailedUi />}
            {paymentStatus === "success" && (
              <div className="status-container flex items-center justify-center ">
                <div className="max-w-4xl w-full p-6 lg:p-10 flex flex-col items-center text-center">
                  <div className="w-3/4 max-w-xs sm:max-w-md lg:max-w-lg">
                    <Lottie animationData={paymentSuccessAnimation} loop={5} />
                  </div>
                  <p className="text-lg sm:text-2xl lg:text-3xl text-green-600 mt-6 font-semibold">
                    Payment Successful!
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 mt-2">
                    Redirecting, Please wait...
                  </p>
                </div>
              </div>
            )}
            {paymentStatus === null && (
              <div className="order-summary p-5 sm:p-8 lg:p-10 w-full max-w-2xl">
                <h2 className="text-center mb-4 relative text-xl md:text-3xl lg:text-4xl">
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
                      <strong>
                        {" "}
                        {Math.floor(
                          order_amount - (order_amount * discount) / 100
                        )}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="action-container flex flex-col items-center mt-6">
                  <Button
                    className="bg-green-500 text-white px-12 py-4  text-lg font-semibold hover:bg-green-600 flex items-center"
                    onClick={handlePayment}
                  >
                    <FaCheckCircle className="mr-2" /> Proceed to Payment
                  </Button>
                  {loading ? (
                    <Button
                      variant="outline"
                      className="px-12 py-4 mt-2 text-lg font-semibold bg-red-500 text-white  hover:bg-red-600"
                    >
                      <Loader2 className="mr-3 animate-spin" /> Please Wait..
                    </Button>
                  ) : (
                    <Button
                      bg-red-500
                      text-white
                      hover:bg-red-600
                      className="px-12 py-4 mt-2 text-lg font-semibold bg-red-500 text-white  hover:bg-red-600"
                      onClick={() => {
                        cancelOrder({
                          orderId,
                          email,
                          razorpay_order_id,
                          setLoading,
                        });
                      }}
                    >
                      <MdCancel className="mr-3" /> Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-600 text-center text-xl min-h-screen">
            No payment process is currently active.
          </p>
        )}
      </div>
      {paymentStatus !== "success" && <Footer />}
    </>
  );
};

export default HandlePaymentUI;
