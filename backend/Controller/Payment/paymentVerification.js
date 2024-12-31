const crypto = require("crypto");
const Order = require("../../modals/order");
const User = require("../../modals/user");

const RAZOR_PAY_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.RAZOR_PAY_SECRET
    : process.env.LOCAL_RAZOR_PAY_SECRET;

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const { secret } = req.query;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", RAZOR_PAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Find and update the order only if both razorpay_order_id and _id match the same order
      const order = await Order.findOneAndUpdate(
        { razorpay_order_id: razorpay_order_id, _id: secret }, // Match both fields
        {
          paymentStatus: "successful",
          razorpay_payment_id: razorpay_payment_id,
        },
        { new: true } // Return the updated document
      ).populate("product");

      if (!order) {
        return res
          .status(400)
          .json({ message: "Invalid action, order not found" });
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
        } else {
          // Handle case where user is not found
          console.error("User not found");
        }
      }

      return res.redirect(
        `/download/${order._id}/verified/${order.razorpay_payment_id}`
      );
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = paymentVerification;
