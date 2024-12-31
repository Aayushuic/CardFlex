import React, { useEffect, useState } from "react";
import { ShoppingCart, Download, Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { addToCart, logout } from "@/features/authslice";
import Modal from "./DescriptionModal"; // Import Modal component
import "./Description.css";

const Description = () => {
  const location = useLocation();
  const productDetails = location.state;
  const discount = productDetails
    ? Math.ceil(
        ((productDetails.oldPrice - productDetails.newPrice) /
          productDetails.oldPrice) *
          100
      )
    : 0;
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const dispatch = useDispatch();

  const isItemInCart = user?.cart?.some(
    (item) => item._id === productDetails._id
  );

  useEffect(() => {
    if (!productDetails) {
      navigate("/page-not-found");
      return;
    }
  }, [productDetails, navigate]);

  if (!productDetails) {
    return;
  }

  const handleAddtoCart = async (productId) => {
    setLoading(true);
    try {
      if (!user) {
        toast.info("Please login...");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/cart/add`,
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
        toast.success(responseData.message);
        dispatch(addToCart(responseData.cart));
      } else {
        if (responseData.message === "Session Expired") {
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

  const handleDownload = () => {
    if (user) {
      handleAddtoCart(productDetails._id);
    }
    navigate("/checkout", {
      state: {
        _id: productDetails._id,
        imageSrc: productDetails.imageSrc,
        title: productDetails.title,
        oldPrice: productDetails.oldPrice,
        newPrice: productDetails.newPrice,
        description: productDetails.description,
      },
    });
    window.scrollTo(0, 0);
  };

  const handleImageClick = () => {
    setIsModalOpen(true); // Open the modal when image is clicked
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-8xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <div
            className="relative w-full max-w-[600px] h-auto md:h-[500px] cursor-pointer"
            onClick={handleImageClick} // Trigger modal on click
          >
            <img
              src={productDetails.imageSrc}
              alt="image preview"
              className="w-full h-full object-cover md:object-contain rounded-lg  transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Description Section */}
        <Card className="border-none dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 overflow-hidden ">
          <CardHeader className=" px-6 pt-6 cursor-pointer">
            <CardTitle className="text-3xl font-semibold leading-tight">
              {productDetails.title}
            </CardTitle>
            <div className="flex items-center mt-3 space-x-2">
              <span className="text-gray-500 line-through">
                ₹{productDetails.oldPrice}
              </span>
              <span className="text-green-600 text-2xl font-bold">
                ₹{productDetails.newPrice}
              </span>
              <Badge
                variant="info"
                className="ml-2 bg-green-100 text-green-800"
              >
                {discount}% off
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {productDetails.description}
            </p>
            <ul className="text-base space-y-3">
              <li>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  File Type:
                </span>{" "}
                CDR
              </li>
              <li>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Properties:
                </span>{" "}
                Fully Customizable File with Fonts, High resolution.
              </li>
              <li>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Supported Version:
                </span>{" "}
                All Coreldraw Version X3 to 2022 and Above.
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex gap-4 p-6">
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-pink-500 hover:text-pink-400 transition"
            >
              <Download className="w-5 h-5 icon-hover-wiggle" />
              Download
            </Button>
            {loading ? (
              <Button className="flex items-center gap-2 px-4 py-2 bg-[#1B3C73] text-white hover:bg-[#40679E] transition">
                <Loader2 className="w-5 h-5 animate-spin" />
              </Button>
            ) : isItemInCart ? (
              <Button
                variant="solid"
                disabled
                className="flex items-center gap-2 px-4 py-2 bg-[#1B3C73] hover:bg-[#40679E] text-white transition"
              >
                <ShoppingCart className="mr-2 w-5 h-5 icon-hover-wiggle" />
                Added
              </Button>
            ) : (
              <Button
                variant="solid"
                onClick={() => handleAddtoCart(productDetails._id)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1B3C73] hover:bg-[#40679E] text-white transition"
              >
                <ShoppingCart className="w-5 h-5 icon-hover-wiggle" />
                Add to Cart
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal
        imageSrc={productDetails.imageSrc}
      />
    </div>
  );
};

export default Description;
