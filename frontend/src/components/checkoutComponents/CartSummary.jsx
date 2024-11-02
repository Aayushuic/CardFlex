// /src/components/Cart/CartSummary.jsx
import React from "react";
import CartItem from "../Cart/CartItem";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const CartSummary = ({ cart, subtotal, handleRemove}) => {
  return (
    <div className="flex flex-col h-[500px] bg-white p-0 sm:p-6 rounded-lg  border-none ">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Cart</h3>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center space-y-4 py-10">
          <BsCartX className="text-6xl text-pink-500" />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your cart is empty.
          </p>
          <Link to="/">
            <Button variant="outline">Browse Now</Button>
          </Link>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar  mb-6">
          {cart.map((item, idx) => (
            <CartItem
              key={idx}
              item={item}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
      <div className="flex justify-between items-center border-t pt-4 border-gray-200">
        <span className="text-lg font-semibold text-gray-800">Subtotal</span>
        <span className="text-xl font-bold text-gray-900">₹{subtotal}</span>
      </div>
    </div>
  );
};

export default CartSummary;
