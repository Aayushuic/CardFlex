import CartItem from "@/components/Cart/CartItem";
import { Button } from "@/components/ui/button";
import { logout, removeFromCart } from "@/features/authslice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Heart, ShoppingCart } from "lucide-react";

const CartPage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = user?.cart?.reduce(
    (total, item) => total + item.newPrice,
    0
  );

  // Handle remove item
  const handleRemove = async (productId, setLoading) => {
    setLoading(true);
    try {
      if (!user) {
        toast.info("Please login...");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/cart/remove`,
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
        dispatch(removeFromCart(responseData.cart));
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg">
        {user?.cart?.length > 0 && (
          <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
            Ready to Make These Yours? Your Cart is Waiting!
          </h2>
        )}

        {user?.cart?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-5">
            <ShoppingCart className="h-24 w-24 text-pink-600 mb-4" />
            <p className="text-xl text-[#1B3C73] text-center">
              Oops! Your cart feels a little light. <br />
              <span className="font-semibold">Why not add something fun?</span>
            </p>
            <Link to="/">
              <Button
                variant="outline"
                className="flex items-center gap-2 group mt-5"
              >
                <Heart className="h-5 w-5 text-gray-800 transition-colors duration-200 group-hover:text-red-500" />
                <span className="text-gray-800">Browse Products</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {user?.cart.map((item, idx) => (
              <CartItem key={idx} item={item} onRemove={handleRemove} />
            ))}

            <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t pt-4">
              <span className="text-xl font-semibold">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ₹{subtotal}
              </span>
            </div>

            <div className="mt-8">
              <Button
                variant="outline"
                className="w-full bg-[#1B3C73] hover:bg-[#25519d] text-white hover:text-white py-3 rounded-lg text-lg font-semibold duration-300"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
