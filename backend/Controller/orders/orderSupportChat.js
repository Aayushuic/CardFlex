const OrderSupport = require("../../modals/OrderSupport");

const orderSupportChat = async (req, res) => {
  try {
    const { newMessage, ticketId } = req.body;

    if (!newMessage || !ticketId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Message and ticket ID are required",
        });
    }

    const userId = req._id;
    const ticket = await OrderSupport.findOne({ _id: ticketId, user: userId });

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    const createNewMessage = {
      message: newMessage,
      sentAt: Date.now(),
      isAdmin: false,
    };

    ticket.messages.push(createNewMessage);
    await ticket.save();

    const userTicket = await OrderSupport.find({ user: userId }).populate({
      path: "order",
      select: ["razorpay_order_id"], // Only include razorpay_order_id in the populated order field
    });

    return res.status(200).json({ success: true, userTicket });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      });
  }
};

module.exports = orderSupportChat;
