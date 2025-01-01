const Order = require("../../modals/order");
const User = require("../../modals/user");

exports.paymentStatus = async (req, res) => {
  try {
    const { orderId, razorpay_order_id } = req.query;

    if (!orderId || !razorpay_order_id) {
      return res
        .status(400)
        .json({ success: false, message: "invalid request" });
    }
    const order = await Order.findOne({ _id: orderId, razorpay_order_id });
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "invalid request" });
    }

    if (order.user) {
      const user = await User.findById(order.user);
      if (user) {
        // Clear the user's cart
        for (let i = 0; i < order.product.length; i++) {
          user.purchasedItem.push(order.product[i]._id);
        }
        user.cart = [];
        if (user.isFirst) {
          user.isFirst = false;
        }
        await user.save();
      }
    }

    if (order.paymentStatus == "successful") {
      return res
        .status(200)
        .json({
          success: true,
          message: "payment Successfull",
          razorpay_payment_id: order.razorpay_payment_id,
        });
    } else if (order.paymentStatus == "pending") {
      return res
        .status(200)
        .json({ success: false, pending: true, message: "payment pending" });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "payment failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};
