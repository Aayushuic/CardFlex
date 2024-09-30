import React from "react";

const OrderInformation = ({order}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 ">Order Information</h2>
      <div className="p-6 rounded-lg">
        <p>
          <strong>Name:</strong> {order.name}
        </p>
        <p>
          <strong>Receipt ID:</strong> {order.receipt}
        </p>
        <p>
          <strong>Order ID:</strong> {order.razorpay_order_id}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default OrderInformation;
