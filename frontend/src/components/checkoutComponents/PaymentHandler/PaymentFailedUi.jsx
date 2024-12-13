import Lottie from "lottie-react";
import React from "react";
import paymentFailedAnimation from "@/assets/paymentFailed.json";
import { FaArrowLeft, FaTicketAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { BiSupport } from "react-icons/bi";
import { setCurrentOrder, setPaymentStatus } from "@/features/paymentSlice";

const PaymentFailedUi = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleRaiseTicket = () => {
    if (!user) {
      navigate("/login");
      toast.error("please login");
    } else {
      navigate("/orders");
    }
  };

  const handleBackClick = ()=>{
    dispatch(setPaymentStatus(null));
    dispatch(setCurrentOrder(null));
    navigate("/checkout",{replace:true});
  }
  return (
    <div className="status-container flex items-center justify-center -mt-3">
      <div className="max-w-5xl w-full p-4 lg:p-10">
        {/* Header Section */}
        <div className="text-center ">
          <p className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">
            Payment Failed
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            If money was deducted and file was not received, please
            contact support. Logged-in users can raise a ticket from the{" "}
            <strong>Orders</strong> page.
          </p>
        </div>

        <div className="flex justify-center items-center -mt-2">
          <div className="max-w-xs sm:max-w-sm w-full">
            <Lottie animationData={paymentFailedAnimation} loop={3} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          {/* Raise Ticket Button */}
          {user && (
            <Button
              className="px-8 py-4 rounded-lg text-lg font-semibold text-[#1B3C73] hover:text-[#1B3C73]"
              variant="outline"
              onClick={handleRaiseTicket}
            >
              <FaTicketAlt className="mr-2" /> Raise Ticket
            </Button>
          )}
          {!user && (
            <Button
              className="px-8 py-4 rounded-lg text-lg font-semibold text-[#1B3C73] hover:text-[#1B3C73]"
              variant="outline"
              onClick={()=>{
                navigate("/help")
              }}
            >
              <BiSupport className="mr-2" /> Contact Support
            </Button>
          )}

          {/* Go Back Button */}
          <Button className="px-8 py-4 text-white bg-[#1B3C73] hover:bg-[#40679E]" onClick={handleBackClick}>
            <FaArrowLeft className="mr-2" /> Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedUi;
