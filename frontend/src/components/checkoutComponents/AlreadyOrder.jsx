import useCancelOrder from "@/hooks/useCancelOrder";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const AlreadyOrder = ({ orderId, razorpay_order_id, email }) => {
  const navigate = useNavigate();
  const { cancelOrder } = useCancelOrder();
  const [loading, setLoading] = useState(false);

  const onProceed = () => {
    navigate("/payment");
  };

  const onPlaceNew = () => {
    cancelOrder({ orderId, razorpay_order_id, email, setLoading });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4 py-8 sm:px-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1B3C73]">Pending Order</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          You already have a pending order. What would you like to do?
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6 space-y-4 sm:space-y-0">
          <Button
            className="bg-green-500 text-white py-2 px-4 rounded-md text-lg hover:bg-green-600 flex-1 sm:flex-initial"
            onClick={onProceed}
          >
            Proceed with Previous Order
          </Button>
          {loading ? (
            <Button
              className="bg-red-500 text-white py-2 px-4 rounded-md text-lg hover:bg-red-600 flex-1 sm:flex-initial"
              disabled
            >
              <Loader2 className="animate-spin mr-2" />
              Please Wait
            </Button>
          ) : (
            <Button
              className="bg-red-500 text-white py-2 px-4 rounded-md text-lg hover:bg-red-600 flex-1 sm:flex-initial"
              onClick={onPlaceNew}
            >
              Place New Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlreadyOrder;
