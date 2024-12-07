import Lottie from "lottie-react";
import React from "react";
import paymentPendingAnimation from "@/assets/paymentPending.json";

const PaymentPendingUI = ({attempts }) => {
  return (
    <div className="status-container text-center space-y-4 md:min-h-screen mt-8 md:-mt-9 ">
      <Lottie
        animationData={paymentPendingAnimation}
        loop
        className="w-full sm:w-200 lg:w-[500px]"
      />
      {attempts > 2 ? (
        <p className="text-lg sm:text-xl text-gray-700 md:mt-2">
          Oops, it’s taking a bit longer!
          <span>But don’t worry, good things are worth the wait</span>
        </p>
      ) : (
        <p className="text-lg sm:text-xl text-gray-700  md:mt-2">
          Please wait while we confirm your payment...{" "}
        </p>
      )}

      {/* <p className="text-2xl font-bold text-red-500 sm:mt-5">
        {countdown} seconds remaining
      </p> */}
    </div>
  );
};

export default PaymentPendingUI;
