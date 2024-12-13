const orderSupport = require("../../modals/OrderSupport");

const fetchTicket = async (req, res) => {
  try {
    const userId = req._id;
    const ticket = await orderSupport.find({ user: userId }).populate({
      path:"order",
      select:["razorpay_order_id"]
    });

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found for the user" });
    }

    return res.status(200).json({ success: true, ticket });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "An error occurred",
        error: error.message,
      });
  }
};

module.exports = fetchTicket;
