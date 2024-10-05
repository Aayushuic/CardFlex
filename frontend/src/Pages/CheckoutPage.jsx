import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, removeFromCart } from "@/features/authslice";
import PaymentInfo from "@/components/checkoutComponents/PaymentInfo";
import GuestProductDetails from "@/components/checkoutComponents/GuestProductDetails";
import CartSummary from "@/components/checkoutComponents/CartSummary";
import { Button } from "@/components/ui/button";
import LoggedInBillingForm from "@/components/checkoutComponents/LoggedInBillingForm";
import GuestBillingForm from "@/components/checkoutComponents/GuestBillingForm";
import LoadingOverlay from "../components/checkoutComponents/LoadingOverLay";
import CouponCode from "@/components/checkoutComponents/CouponCode"; // Import the CouponCode component
import {
  createOrder,
  fetchRazorpayKey,
  initiateRazorpay,
} from "@/hooks/checkoutUtils";
import Footer from "@/components/utils/Footer";

const CheckoutPage = () => {
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const cart = user ? user.cart : [];
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state || null;
  const dispatch = useDispatch();
  const subtotal = cart.reduce((total, item) => total + item.newPrice, 0);
  const [guestUser, setGuestUserInfo] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const cartProductArray = useMemo(() => {
    if (user) {
      return cart.map((product) => product._id);
    }
    return null;
  }, [user, cart]);

  // Handler to apply discount
  const applyDiscount = (discountedAmount) => {
    setDiscount(discountedAmount);
  };

  const handleRemove = async (productId) => {
    setLoading(true);
    try {
      if (!user) {
        toast.info("Please login to continue.");
        navigate("/login");
        return;
      }

      const response = await fetch("/api/user/cart/remove", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
          "X-CSRF-Token": localStorage.getItem("csrfToken"),
        },
        body: JSON.stringify({ productId }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        dispatch(removeFromCart(responseData.cart));
      } else {
        if (responseData.message == "Session Expired") {
          toast.error(responseData.message);
          dispatch(logout());
          navigate("/login");
          return;
        }
      }
    } catch (error) {
      toast.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      if (!user && !guestUser) {
        toast.error("please add billing address");
        return;
      }
      if (cart.length == 0 && product == null) {
        toast.error("please add item in cart");
        return;
      }

      setLoadingOverlay(true);

      // Fetch Razorpay key
      const razorpayKey = await fetchRazorpayKey();

      // Create order
      let orderDetails = {
        name: user?.name || guestUser?.name,
        email: user?.email || guestUser?.email,
        phoneNumber: user?.phoneNumber || guestUser?.phoneNumber,
        userId: user?._id || null,
        product: user != null ? cartProductArray : [product._id],
        amount: user != null ? subtotal : product.newPrice,
        discountPercentage: discountPercentage,
      };
      const orderInstance = await createOrder(orderDetails);

      const { razorpay_order_id, orderId, amount } = orderInstance;

      // Razorpay options
      const options = {
        key: razorpayKey,
        amount: amount,
        currency: "INR",
        name: "Card Flex",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: razorpay_order_id,
        callback_url: `/api/payment/payment-verification?secret=${orderId}`,
        prefill: {
          name: "Card Flex",
          email: "cardflexhelp@gmail.com",
          contact: "7060457474",
        },
        notes: {
          address: "Aayush Chauhan",
        },
        theme: {
          color: "#1B3C73",
        },
      };

      // Initiate payment
      initiateRazorpay(options);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingOverlay(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-0 sm:px-6 py-12 max-w-6xl">
        {loadingOverlay && <LoadingOverlay />} {/* Show overlay when loading */}
        <h1 className="text-3xl font-bold text-center text-[#1B3C73] mb-12">
          Checkout
        </h1>
        <div className="flex flex-col lg:flex-row gap-8 p-0">
          <div className="lg:w-1/2 bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Order Summary
            </h2>
            {user ? (
              <CartSummary
                cart={cart}
                subtotal={Math.floor(
                  subtotal - (subtotal * discountPercentage) / 100
                )} // Apply discount to subtotal
                handleRemove={handleRemove}
                loading={loading}
              />
            ) : (
              <GuestProductDetails product={product} />
            )}
          </div>
          {(product || cart) && (
            <div className="lg:w-1/2 bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Billing Information
              </h2>
              {user ? (
                <LoggedInBillingForm user={user} />
              ) : (
                <GuestBillingForm
                  setGuestUserInfo={setGuestUserInfo}
                  guestUser={guestUser}
                />
              )}
              {(guestUser !== null || user !== null) &&
                (product != null || cart.length !== 0) && (
                  <div className="mt-8">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition ease-in-out duration-300"
                      onClick={onSubmit}
                    >
                      Proceed with Payment
                    </Button>

                    {/* Move CouponCode component here */}
                    {user ? (
                      <div className="mt-4">
                        <CouponCode
                          subtotal={subtotal}
                          applyDiscount={applyDiscount}
                          setDiscountPercentage={setDiscountPercentage}
                        />
                      </div>
                    ) : (
                      <div className="mt-5 text-center text-red-600">
                        <p className="text-lg">
                          🌟 Exclusive Offers for Registered Users! 🌟
                        </p>
                        <p>
                          Sign up now to unlock amazing discounts and coupon
                          codes!
                        </p>
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}
        </div>
        {(product || cart) && (
          <div className="mt-12 bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Payment Information
            </h2>
            <PaymentInfo />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
