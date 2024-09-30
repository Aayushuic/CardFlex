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
    setLoading(true);
    try {
      if (!user) {
        toast.info("login to add item in cart");
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:8080/api/user/cart/add", {
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

  // Check if the item exists in the user's cart by comparing the _id with the cart items' _id
  const isItemInCart = user?.cart?.some((item) => item._id === _id);

  const handleDownload = () => {
    if (user) {
      handleAddtoCart(_id);
    }
    navigate("/checkout", {
      state: { _id, imageSrc, title, oldPrice, newPrice, description },
    });
    window.scrollTo(0, 0);
  };

  return (
    <div className="border rounded-md overflow-hidden bg-white dark:bg-gray-800 dark:border-none transition-all shadow-md hover:shadow-2xl hover:shadow-gray-600 cursor-pointer">
      {/* Image and Description */}
      <div onClick={handleDescriptionPageClick}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="w-full h-auto aspect-[4/3] object-cover"
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

      {/* Buttons for Download and Cart */}
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

        {/* Add to Cart or Loading Button */}
        {loading ? (
          <Button
            variant="solid"
            className="flex-1 ml-2 flex justify-center items-center py-2 px-4 text-white bg-[#1B3C73] hover:bg-[#40679E] rounded-md transition-all duration-300"
          >
            <Loader2 className="animate-spin" />
          </Button>
        ) : isItemInCart ? (
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
    </div>
  );
};
