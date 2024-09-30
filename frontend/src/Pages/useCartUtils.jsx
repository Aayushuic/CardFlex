// src/utils/cartUtils.js

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/authslice"; // import the action

export const useCartUtils = () => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = async (
    productId,
    user,
    navigate,
    setLoading
  ) => {
    setLoading(true);
    try {
      if (!user) {
        toast.info("Please log in...");
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/user/cart/remove",
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
            "X-CSRF-Token": localStorage.getItem("csrfToken"),
          },
          body: JSON.stringify({ productId }),
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        toast.info(responseData.message);
        dispatch(removeFromCart(responseData.cart)); // direct dispatch
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return { handleRemoveFromCart };
};
