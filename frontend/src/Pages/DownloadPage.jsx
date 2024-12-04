import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { clearCart } from "@/features/authslice";
import Footer from "@/components/utils/Footer";
import OrderInformation from "@/components/DownloadPage/OrderInformation";
import DownloadFiles from "@/components/DownloadPage/DownloadFiles";

import "react-loading-skeleton/dist/skeleton.css"; // Include skeleton CSS
import SkeletonDownload from "@/components/DownloadPage/Skeleton";
import OrderNotFound from "@/components/DownloadPage/OrderNotFound";
import FeedBack from "@/components/CustomerFeedback/FeedBack";

const DownloadPage = () => {
  const { orderId, paymentId } = useParams(); // Get the orderId and paymentId from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const confettiRef = useRef(null); // Always declare hooks at the top level

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/order/${orderId}/token/${paymentId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": import.meta.env.VITE_API_KEY,
              "X-CSRF-Token": localStorage.getItem("csrfToken"),
            },
          }
        );

        const responseData = await response.json();
        if (responseData.success === true) {
          setOrder(responseData.order);
          if (responseData.order?.user != null) {
            dispatch(clearCart());
          }
        }
      } catch (error) {
        console.error("Error fetching order details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, paymentId]);

  if (loading) {
    return <SkeletonDownload />;
  }

  if (!order) {
    return <OrderNotFound />;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto overflow-x-hidden">
        <div
          className="max-w-6xl mx-auto py-10 px-4 relative overflow-y-hidden overflow-x-hidden"
          ref={confettiRef}
        >
          <Confetti
            recycle={false}
            width={confettiRef.current?.clientWidth}
            height={confettiRef.current?.clientHeight}
            numberOfPieces={500}
          />
          <h1 className="text-3xl font-bold text-center mb-8 text-[#1B3C73]">
            Thank you for your purchase!
          </h1>
          <p className="text-lg text-center mb-6">
            Here are your downloadable files and order details:
          </p>

          {/* Note for registered users */}
          <p className="text-md font-semibold text-center text-yellow-500 mb-4">
            <span className="font-bold">Note:</span> As a registered user, you
            can conveniently access all your downloadable files from the{" "}
            <strong>Orders</strong> section at any time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section for downloadable files */}
            <div>
              <DownloadFiles order={order}></DownloadFiles>
            </div>

            {/* Simplified Section for payment/order details */}
            <div className="ml-8">
              <OrderInformation order={order}></OrderInformation>
            </div>
          </div>

          <div className="mt-14 text-center px-4 md:px-0">
            <FeedBack />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DownloadPage;
