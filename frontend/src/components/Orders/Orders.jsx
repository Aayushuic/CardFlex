import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Orders = ({ orders }) => {
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);
  const toggleExpandOrder = (index) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-0 sm:p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-[#1B3C73] mt-5">
        Your Orders
      </h2>
      {orders.map((order, index) => (
        <motion.div
          key={index}
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-none bg-white shadow-bottom shadow-lg shadow-gray-100 rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-4 text-[#1B3C73]">
              Order ID: {order.razorpay_order_id}
            </h3>
            <div className="mb-6">
              {order.product.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-center justify-between p-4 border-b dark:border-gray-700"
                >
                  <div className="flex items-center space-x-4 md:space-x-6">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 object-fit rounded-lg shadow-md md:w-24 md:h-24"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        ₹{item.newPrice}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a href={item.cdrFile}>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 px-4 py-2 text-pink-600 hover:bg-red-50 hover:text-pink-700"
                      >
                        <Download className="mr-1" />
                        Download
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center">
              <Collapsible open={expandedOrderIndex === index}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-blue-600 hover:underline mb-4 md:mb-0"
                    onClick={() => toggleExpandOrder(index)}
                  >
                    {expandedOrderIndex === index
                      ? "Show Less"
                      : "Show Details"}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-4 border-t pt-4 ">
                    <div className="flex items-center">
                      <h4 className="text-lg font-semibold text-gray-700 mb-1">
                        Payment Status:{" "}
                      </h4>
                      <div className="pb-2 pl-2 pr-2">
                        <Badge
                          variant="outline"
                          className="bg-green-300 text-gray-600"
                        >
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-gray-600">
                      <strong className="text-gray-800">Amount Paid:</strong>{" "}
                      <span className="text-xl font-bold text-green-700">
                        ₹{order.amount}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      <strong className="text-gray-800">Discount:</strong>{" "}
                      <span className="text-red-500">
                        {order.discountPercentage}%
                      </span>
                    </p>
                    <p className="text-gray-600">
                      <strong className="text-gray-800">Receipt:</strong>{" "}
                      <span className="text-gray-600 italic">
                        {order.receipt}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      <strong className="text-gray-800">Ordered At:</strong>{" "}
                      <span className="text-gray-600">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </p>
                    {/* Note about saving the receipt */}
                    <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                      <p className="font-semibold">Note:</p>
                      <p>
                        Your order details will remain available for 15 days.
                        Please save your files on your local device.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Orders;
