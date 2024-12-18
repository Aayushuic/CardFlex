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
import { Download, HelpCircle, Ticket } from "lucide-react";
import HelpDialog from "./OrdersHelpDailog";
import Modal from "../ConfirmationModal/Modal";
import { Link } from "react-router-dom";
import Footer from "../utils/Footer";
import { Helmet } from "react-helmet"; // Import Helmet for SEO
import { TbFileInvoice } from "react-icons/tb";
import useInvoiceGenerator from "@/hooks/useInvoiceGenerator";

const Orders = ({ orders }) => {
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [razorpay_order_id, setrazorpay_order_id] = useState("");
  const [receipt, setreceipt] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const { generatePDF } = useInvoiceGenerator();

  const toggleExpandOrder = (index) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index);
  };

  const handleHelpClick = (razorpay_order_id, receipt) => {
    setIsHelpOpen(true);
    setrazorpay_order_id(razorpay_order_id);
    setreceipt(receipt);
  };

  return (
    <>
      {/* SEO Tags */}
      <Helmet>
        <title>Your Orders | CardFlex</title>
        <meta
          name="description"
          content="View and manage your orders at Cardflex. Track payment statuses, download CDR files, and get help for your orders."
        />
        <meta
          name="keywords"
          content="orders, payment status, download CDR files, Cardflex, ticket support"
        />
        <meta property="og:title" content="Your Orders | Cardflex" />
        <meta
          property="og:description"
          content="View and manage your orders at Cardflex. Track payment statuses, download CDR files, and get help for your orders."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#1B3C73]">
          Your Orders
        </h2>

        {orders?.map((order, index) => (
          <motion.div
            key={index}
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 ease-in-out hover:shadow-xl">
              <div className="flex justify-between md:items-center sm:items-start flex-col md:flex-row">
                <h3 className="text-2xl font-semibold text-indigo-800">{`Order ID: ${order?.razorpay_order_id}`}</h3>
                <Badge
                  variant="outline"
                  className={`text-sm px-3 py-1 rounded-full ${
                    order.paymentStatus === "pending"
                      ? "bg-yellow-300 text-yellow-800"
                      : order.paymentStatus === "failed"
                      ? "bg-red-300 text-red-800"
                      : order.paymentStatus === "successful"
                      ? "bg-green-300 text-green-800"
                      : order.paymentStatus === "refunded"
                      ? "bg-blue-300 text-blue-800"
                      : order.paymentStatus === "refund_processed"
                      ? "bg-purple-300 text-purple-800"
                      : order.paymentStatus === "cancelled"
                      ? "bg-red-300 text-red-800"
                      : ""
                  }`}
                >
                  {order.paymentStatus === "pending"
                    ? "Payment Pending"
                    : order.paymentStatus === "failed"
                    ? "Payment Failed"
                    : order.paymentStatus === "successful"
                    ? "Payment Successful"
                    : order.paymentStatus === "refunded"
                    ? "Refunded"
                    : order.paymentStatus === "refund_processed"
                    ? "Refund Processed"
                    : order.paymentStatus === "cancelled"
                    ? "cancelled"
                    : ""}
                </Badge>
              </div>
              <div className="mt-4">
                {order.product.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-center justify-between mb-6"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item?.imageUrl}
                        alt={item?.title}
                        className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg shadow-md"
                      />
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl font-semibold text-indigo-700">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">₹{item?.newPrice}</p>
                      </div>
                    </div>
                    {order.paymentStatus == "successful" && (
                      <div className="mt-4 sm:mt-0">
                        <a href={item?.cdrFile}>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2 text-indigo-600 border-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
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

              <div className="flex justify-between">
                <Collapsible open={expandedOrderIndex === index}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-indigo-600 hover:text-indigo-700"
                      onClick={() => toggleExpandOrder(index)}
                    >
                      {expandedOrderIndex === index
                        ? "Show Less"
                        : "Show Details"}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4 border-t pt-4 text-gray-700">
                      <p>
                        <strong>Payment Status:</strong>{" "}
                        <span>{order.paymentStatus}</span>
                      </p>
                      <p>
                        <strong>
                          {order.paymentStatus === "pending"
                            ? "Amount To be Paid"
                            : "Amount Paid"}{" "}
                          :
                        </strong>{" "}
                        ₹{order.amount}
                      </p>
                      <p>
                        <strong>Discount:</strong> {order.discountPercentage}%
                      </p>
                      <p>
                        <strong>Receipt:</strong> {order.receipt}
                      </p>
                      <p>
                        <strong>Payment Method:</strong>{" "}
                        {order.paymentMethod == null
                          ? "online"
                          : order.paymentMethod}
                      </p>
                      <p>
                        <strong>Ordered At:</strong>{" "}
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                      <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <p>
                          <strong>Note:</strong> Your order details will remain
                          available for 15 days. Please save your files.
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                {order.paymentStatus == "successful" && (
                  <Button
                    variant="outline"
                    className="text-indigo-600 hover:text-indigo-700"
                    onClick={() => {
                      generatePDF(order);
                    }}
                  >
                    <TbFileInvoice />
                    Invoice
                  </Button>
                )}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  onClick={() =>
                    handleHelpClick(order?.razorpay_order_id, order?.receipt)
                  }
                >
                  <HelpCircle className="mr-1" />
                  Help
                </Button>

                <Link to="/ticket">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    <Ticket className="mr-1" />
                    Your Tickets
                  </Button>
                </Link>
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
      <Footer />
    </>
  );
};

export default Orders;
