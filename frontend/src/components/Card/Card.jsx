import React, { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart, Download, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, logout } from "@/features/authslice";

export const Card = ({
  _id,
  imageSrc,
  title,
  oldPrice,
  newPrice,
  description,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDescriptionPageClick = () => {
    navigate("/description", {
      state: { _id, imageSrc, title, oldPrice, newPrice, description },
    });
    window.scrollTo(0, 0);
  };

  const handleAddtoCart = async (productId) => {
    try {
      if (!user) {
        toast.info("Please log in to add items to the cart.");
        navigate("/login");
        return false;
      }

      if (isItemInCart) {
        return true;
      }
      setLoading(true);
      const response = await fetch("/api/user/cart/add", {
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
        dispatch(addToCart(responseData.cart));
        return true; // Indicate success
      } else {
        if (responseData.message === "Session Expired") {
          toast.error(responseData.message);
          dispatch(logout());
          navigate("/login");
        }
        return false; // Indicate failure
      }
    } catch (error) {
      toast.error(error.message || error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if the item exists in the user's cart by comparing the _id with the cart items' _id
  const isItemInCart = user?.cart?.some((item) => item._id === _id);

  const handleDownload = async () => {
    if (user) {
      const success = await handleAddtoCart(_id);
      if (success) {
        navigate("/checkout", {
          state: { _id, imageSrc, title, oldPrice, newPrice, description },
        });
        window.scrollTo(0, 0);
      }
    } else {
      navigate("/checkout", {
        state: { _id, imageSrc, title, oldPrice, newPrice, description },
      });
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden bg-white dark:bg-gray-800 dark:border-none transition-all shadow-md group cursor-pointer">
      {/* Image and Description */}
      <div onClick={handleDescriptionPageClick}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="w-full h-auto aspect-[4/3] object-cover group-hover:opacity-70"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          <div className="flex items-center mt-2">
            <span className="text-gray-500 line-through mr-2">
              &#8377;{oldPrice}
            </span>
            <span className="text-xl font-bold text-green-600">
              &#8377;{newPrice}
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <Button
          variant="solid"
          className="w-full min-h-[56px] p-4 transition-all duration-300 flex items-center justify-center space-x-1"
        >
          <span
            className="w-3 h-3 rounded-full animate-bounce"
            style={{ backgroundColor: "#1B3C73", animationDelay: "0s" }}
          ></span>
          <span
            className="w-3 h-3 rounded-full animate-bounce"
            style={{ backgroundColor: "#1B3C73", animationDelay: "0.3s" }}
          ></span>
          <span
            className="w-3 h-3 rounded-full animate-bounce"
            style={{ backgroundColor: "#1B3C73", animationDelay: "0.5s" }}
          ></span>
        </Button>
      ) : (
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-evenly">
          {/* Download Button */}
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex-1 mr-2 flex justify-center items-center py-2 px-4 text-pink-500 rounded-md transition-all duration-300 hover:text-pink-600"
          >
            <Download className="mr-2 w-5 h-5 icon-hover-wiggle" />
            Download
          </Button>

          {isItemInCart ? (
            <Button
              variant="solid"
              disabled
              className="flex-1 ml-2 flex justify-center items-center py-2 px-4 text-white bg-[#1B3C73] hover:bg-[#40679E] rounded-md transition-all duration-300"
            >
              <ShoppingCart className="mr-2 w-5 h-5 icon-hover-wiggle" />
              Added
            </Button>
          ) : (
            <Button
              variant="solid"
              onClick={() => handleAddtoCart(_id)}
              className="flex-1 ml-2 flex justify-center items-center py-2 px-4 text-white bg-[#1B3C73] hover:bg-[#40679E] rounded-md transition-all duration-300"
            >
              <ShoppingCart className="mr-2 w-5 h-5 icon-hover-wiggle" />
              Add to Cart
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
