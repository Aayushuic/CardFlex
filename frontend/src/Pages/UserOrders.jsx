import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Importing icons

import Orders from "@/components/Orders/Orders";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Heart, ShoppingCart } from "lucide-react";
import Footer from "@/components/utils/Footer";
import { FourSquare } from "react-loading-indicators";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.info("Log in to track your orders and more!");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/order/getOrders`,
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
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FourSquare color="#1B3C73" size="large" text="" textColor="" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <>
        {/* SEO Tags */}
        <Helmet>
          <title>CardFlex - Orders</title>
          <meta
            name="description"
            content="View and manage your orders at Cardflex. Track payment statuses,download invoice, download CDR files, and get help for your orders."
          />
          <meta
            name="keywords"
            content="CardFlex,cardflex your orders,raise ticket,download invoice,free cdr files,orders, payment status, download CDR files, Cardflex, ticket support"
          />
          <meta property="og:title" content="Cardflex - Orders" />
          <meta
            property="og:description"
            content="View and manage your orders at Cardflex. Track payment statuses, download CDR files, and get help for your orders."
          />
          <meta property="og:type" content="website" />
        </Helmet>
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
        <Footer />
      </>
    );
  }

  return <Orders orders={orders} />;
};

export default UserOrders;
