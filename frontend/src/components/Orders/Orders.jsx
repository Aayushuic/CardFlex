import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Download, HelpCircle } from "lucide-react";
import HelpDialog from "./OrdersHelpDailog";
import Modal from "../ConfirmationModal/Modal";


const Orders = ({ orders }) => {
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [razorpay_order_id, setrazorpay_order_id] = useState("");
  const [receipt, setreceipt] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[modalMessage,setModalMessage] = useState("");
  const[modalTitle,setModalTitle] = useState("");

  const toggleExpandOrder = (index) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index);
  };

  const handleHelpClick = (razorpay_order_id, receipt) => {
    setIsHelpOpen(true);
    setrazorpay_order_id(razorpay_order_id);
    setreceipt(receipt);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-[#1B3C73] mt-5">
        Your Orders
      </h2>
      {orders?.map((order, index) => (
        <motion.div
          key={index}
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="border-none bg-white shadow-lg rounded-lg p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1B3C73]">
              Order ID: {order?.razorpay_order_id}
            </h3>
            <div className="mb-4 sm:mb-6">
              {order.product.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 border-b"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item?.imageUrl}
                      alt={item?.title}
                      className="w-16 h-16 rounded-lg shadow-md sm:w-24 sm:h-24"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600">₹{item?.newPrice}</p>
                    </div>
                  </div>
                  {order.paymentStatus !== "pending" && (
                    <div className="mt-4 sm:mt-0">
                      <a href={item?.cdrFile}>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 text-pink-600"
                        >
                          <Download className="mr-1" />
                          Download
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <Collapsible
                open={expandedOrderIndex === index}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-blue-600 hover:underline"
                    onClick={() => toggleExpandOrder(index)}
                  >
                    {expandedOrderIndex === index
                      ? "Show Less"
                      : "Show Details"}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-center mb-2">
                      <h4 className="text-lg font-semibold text-gray-700">
                        Payment Status:
                      </h4>
                      <Badge
                        variant="outline"
                        className={`ml-2 ${
                          order.paymentStatus === "pending"
                            ? "bg-red-300 text-gray-700"
                            : "bg-green-300 text-gray-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </div>
                    <p className="text-gray-600">
                      <strong className="text-gray-800">
                        {order.paymentStatus === "pending"
                          ? "Amount To be Paid:"
                          : "Amount Paid:"}
                      </strong>{" "}
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
                      <span>{new Date(order.createdAt).toLocaleString()}</span>
                    </p>
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

              <div className="flex flex-row sm:flex-col items-center sm:items-start space-x-4 sm:space-y-2 sm:space-x-0 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleHelpClick(order?.razorpay_order_id, order?.receipt)
                  }
                  className="flex items-center gap-2 text-[#1B3C73]"
                >
                  <HelpCircle className="mr-1" />
                  Help
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
      <HelpDialog
        isOpen={isHelpOpen}
        setIsOpen={setIsHelpOpen}
        razorpay_order_id={razorpay_order_id}
        receipt={receipt}
        setModalMessage={setModalMessage}
        setModalTitle={setModalTitle}
        setIsModalOpen={setIsModalOpen}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        title={modalTitle}
      />
    </div>
  );
};

export default Orders;
