import { Loader2, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const CartItem = ({ item, onRemove }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDescriptionPageClick = () => {
    navigate("/description", {
      state: {
        _id: item._id,
        imageSrc: item.imageUrl,
        newPrice: item.newPrice,
        oldPrice: item.oldPrice,
        description: item.description,
      },
    });
    return;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b dark:border-gray-700">
      <div
        className="flex items-center space-x-4 md:space-x-6 cursor-pointer"
        onClick={handleDescriptionPageClick}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-16 h-16 object-fit rounded-lg shadow-md md:w-24 md:h-24"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">₹{item.newPrice}</p>
        </div>
      </div>
      {loading ? (
        <Button
          variant="outline"
          className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 text-pink-600 hover:bg-red-50 hover:text-pink-700 min-w-[100px]"
        >
          <Loader2 className="w-8 h-8 animate-spin" />
        </Button>
      ) : (
        <Button
          variant="outline"
          className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 text-pink-600 hover:bg-red-50 hover:text-pink-700"
          onClick={() => onRemove(item._id, setLoading)}
        >
          <Trash className="w-5 h-5" />
          Remove
        </Button>
      )}
    </div>
  );
};

export default CartItem;
