const crypto = require("crypto");
const Order = require("../modals/order"); // Assuming the order schema is in the "models" folder

const razorpaySecret = process.env.WEBHOOK_SECRET; // Your Razorpay Secret Key

const webhookCaller = async (req, res) => {
  if (!razorpaySecret) {
    return res.status(500).send("Razorpay webhook secret not configured.");
  }
  // Razorpay signature from the headers
  const webhookSignature = req.headers["x-razorpay-signature"];
  // The raw payload that Razorpay sends
  const payload = req.body;

  // Create the expected signature
  const expectedSignature = crypto
    .createHmac("sha256", razorpaySecret)
    .update(JSON.stringify(payload)) // Convert payload to string
    .digest("hex");

  // Verify the signature to ensure the request is from Razorpay
  if (webhookSignature !== expectedSignature) {
    return res.status(400).send("Invalid Signature");
  }

  // Parse the event
  const event = JSON.parse(payload);

  // Handle the event based on the event type
  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    const paymentId = payment.id;
    const razorpayOrderId = payment.order_id;
    const status = payment.status;

    try {
      // Find the order by razorpay_order_id
      const order = await Order.findOne({ razorpay_order_id: razorpayOrderId });

      if (!order) {
        return res.status(404).send("Order not found");
      }

      // Update the payment status in the order
      order.paymentStatus = status === "captured" ? "successful" : "failed";
      order.razorpay_payment_id = paymentId;
      order.receipt = payment.receipt;

      // Save the order with the updated status
      await order.save();

      console.log(
        `Payment captured for Order: ${razorpayOrderId}, Status: ${status}`
      );

      res.status(200).send("Webhook processed successfully");
    } catch (error) {
      console.error("Error processing webhook", error);
      res.status(500).send("Internal Server Error");
    }
  } else if (event.event === "payment.failed") {
    const payment = event.payload.payment.entity;
    const razorpayOrderId = payment.order_id;
    const status = payment.status;

    try {
      // Find the order by razorpay_order_id
      const order = await Order.findOne({ razorpay_order_id: razorpayOrderId });

      if (!order) {
        return res.status(404).send("Order not found");
      }

      // Update the payment status to failed
      order.paymentStatus = "failed";
      order.razorpay_payment_id = payment.id;
      order.receipt = payment.receipt;

      // Save the order with the updated status
      await order.save();

      console.log(
        `Payment failed for Order: ${razorpayOrderId}, Status: ${status}`
      );

      res.status(200).send("Webhook processed successfully");
    } catch (error) {
      console.error("Error processing webhook", error);
      res.status(500).send("Internal Server Error");
    }
  } else if (event.event === "payment.refunded") {
    const payment = event.payload.payment.entity;
    const razorpayOrderId = payment.order_id;
    const refundAmount = payment.refund_amount; // Amount refunded
    const refundStatus = payment.status; // Refund status (e.g., 'processed', 'failed')

    try {
      // Find the order by razorpay_order_id
      const order = await Order.findOne({ razorpay_order_id: razorpayOrderId });

      if (!order) {
        return res.status(404).send("Order not found");
      }

      // Update the payment status to "refunded"
      order.paymentStatus =
        refundStatus === "processed" ? "refunded" : "refund_failed";
      order.razorpay_payment_id = payment.id;
      order.receipt = payment.receipt;

      // Optionally, track the refunded amount
      order.refundAmount = refundAmount;

      // Save the order with the updated status
      await order.save();

      console.log(
        `Payment refunded for Order: ${razorpayOrderId}, Refund Status: ${refundStatus}, Amount: ${refundAmount}`
      );

      res.status(200).send("Webhook processed successfully");
    } catch (error) {
      console.error("Error processing refund webhook", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(200).send("Event not handled");
  }
};

module.exports = webhookCaller;
