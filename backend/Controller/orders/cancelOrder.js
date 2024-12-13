const Order = require("../../modals/order");

exports.cancelOrder = async (req, res) => {
  try {
    const { email, razorpay_order_id, _id } = req.body;
    
    if(!email||!razorpay_order_id||!_id){
        return res.status(400).json({success:false,messsage:"not authenticated"});
    }

    const order = await Order.findOneAndUpdate(
      { email, razorpay_order_id, _id }, // Filter criteria
      { $set: { paymentStatus: "cancelled" } }, // Update operation
      { new: true } // Return the updated document
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "order not found!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "order cancelled!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message||error });
  }
};
