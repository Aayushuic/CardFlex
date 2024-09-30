import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Importing icons

import Orders from "@/components/Orders/Orders";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Heart, ShoppingCart } from "lucide-react";
import Footer from "@/components/utils/Footer";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.info("Log in to track your orders and more!");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/user/order/getOrders",
          {
            method: "GET",
            headers: {
              "x-api-key": import.meta.env.VITE_API_KEY,
              "X-CSRF-Token": localStorage.getItem("csrfToken"),
            },
            credentials: "include",
          }
        );

        if (res.status === 401) {
          navigate("/login");
          toast.info("Session expired. Please log in again.");
          return;
        }

        const resData = await res.json();

        if (resData.success && resData.authentic) {
          setOrders(resData.orders);
        } else {
          navigate("/login");
          toast.info("Please log in to view your orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Something went wrong. Please try again.");
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!orders.length) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <ShoppingCart className="h-16 w-16 text-pink-600 mb-4" />
          <h2 className="text-3xl font-bold text-[#1B3C73] mb-4">
            No Past Orders Found
          </h2>
          <p className="text-gray-600 mb-6">
            Oops! It looks like you haven't ordered anything in the last 30
            days.
            <br />
            Why not explore our amazing products and treat yourself to something
            special? 🌟
          </p>
          <Link to="/">
            <Button
              variant="outline"
              className="flex items-center gap-2 group" // Add the group class here
            >
              <Heart className="h-5 w-5 text-gray-800 transition-colors duration-200 group-hover:text-red-500" />
              {/* Heart turns red on button hover */}
              <span className="text-gray-800">Browse Products</span>
            </Button>
          </Link>
        </div>
        <Footer/>
      </>
    );
  }

  return <Orders orders={orders} />;
};

export default UserOrders;
