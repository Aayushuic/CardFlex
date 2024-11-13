const Order = require("../../modals/order");
const SupportRequest = require("../../modals/OrderSupport");

const createSupportRequest = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      issue,
      additionalDetails,
      razorpay_order_id,
      receipt,
    } = req.body;

    // Check if the order exists
    const foundOrder = await Order.findOne({
      razorpay_order_id: razorpay_order_id.trim(),
      receipt: receipt.trim(),
    });
    if (!foundOrder) {
      return res.status(401).json({ message: "Order not found" });
    }
    // Create the support request
    const newRequest = new SupportRequest({
      user: req._id,
      order: foundOrder._id,
      name,
      phoneNumber,
      issue,
      additionalDetails,
    });

    const newTicket = await newRequest.save();

    res
      .status(201)
      .json({
        message: "Support request created successfully",
        success: true,
        ticketNumber: newTicket.ticketNumber,
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server is busy,try later", success: false });
  }
};

module.exports = createSupportRequest;
