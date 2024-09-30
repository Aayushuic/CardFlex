const Order = require("../../modals/order");

const fetchOrderToDownload = async (req, res) => {
  try {
    const { orderId,paymentId } = req.params;
    const order = await Order.findOne({_id:orderId,razorpay_payment_id:paymentId}).populate("product"); // Populate product details

    if (!order) {
      return res.status(404).json({ message: "invalid request" });
    }

    return res.status(200).json({success:true,order:order}); // Send the order with populated product details
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = fetchOrderToDownload;
