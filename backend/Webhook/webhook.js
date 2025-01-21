const crypto = require("crypto");
const Order = require("../modals/order"); // Assuming the order schema is in the "models" folder

const razorpaySecret = process.env.WEBHOOK_SECRET; // Your Razorpay Secret Key

const webhookCaller = async (req, res) => {
  if (!razorpaySecret) {
    return res.status(500).send("Razorpay webhook secret not configured.");
  }

  // Razorpay signature from the headers
  const webhookSignature = req.headers["x-razorpay-signature"];

  // The raw payload that Razorpay sends is already parsed into an object
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

  // Now, directly use the payload (no need to parse it)
  const event = payload; // <-- Directly using the parsed payload here

  // Handle the event based on the event type
  try {
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const paymentId = payment.id;
      const razorpayOrderId = payment.order_id;
      const status = payment.status;
      const method = payment.method;

      // Find the order by razorpay_order_id
      const order = await Order.findOne({ razorpay_order_id: razorpayOrderId });

      if (!order) {
        return res.status(404).send("Order not found");
      }

      // Update the payment status in the order
      order.paymentStatus = status === "captured" ? "successful" : "failed";
      order.razorpay_payment_id = paymentId;
      order.paymentMethod = method;

      // Save the order with the updated status
      await order.save();

      res.status(200).send("Webhook processed successfully");
    } else if (event.event === "payment.failed") {
      const payment = event.payload.payment.entity;
      const razorpayOrderId = payment.order_id;

      // Find the order by razorpay_order_id
      const order = await Order.findOne({ razorpay_order_id: razorpayOrderId });

      if (!order) {
        return res.status(404).send("Order not found");
      }

      // Update the payment status to failed
      order.paymentStatus = "failed";
      order.razorpay_payment_id = payment.id;

      // Save the order with the updated status
      await order.save();

      res.status(200).send("Webhook processed successfully");
    } else if (event.event === "refund.created") {
      const refund = event.payload.refund.entity;
      const refundId = refund.id;
      const razorpayPaymentId = refund.payment_id;
      const amount = refund.amount;

      // Find the order associated with this payment ID
      const order = await Order.findOne({
        razorpay_payment_id: razorpayPaymentId,
      });

      if (!order) {
        return res.status(404).send("Order not found");
      }

      // Update the order with refund details
      order.paymentStatus = "refund_processed";
      order.refund_id = refundId;
      order.refundAmount = amount;

      await order.save();
      res.status(200).send("Refund created event processed successfully");
    } else if (event.event === "refund.processed") {
      const refund = event.payload.refund.entity;
      const refundId = refund.id;
      const razorpayPaymentId = refund.payment_id;
      const amount = refund.amount;

      // Find the order associated with this payment ID
      const order = await Order.findOne({
        razorpay_payment_id: razorpayPaymentId,
      });

      if (!order) {
        return res.status(404).send("Order not found");
      }

      // Update the order with refund processed status
      order.paymentStatus = "refunded";
      order.refund_id = refundId;
      order.refundAmount = amount;

      await order.save();

      res.status(200).send("Refund processed event handled successfully");
    } else {
      res.status(200).send("Event not handled");
    }
  } catch (error) {
    console.error("Error processing webhook", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = webhookCaller;
