const Order = require("../../modals/order");

const fetchUserOrder = async (req, res) => {
  try {
    const userId = req._id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "unauthenticated", authentic: false });
    }

    const orders = await Order.find({ user: userId }).select(["-user","-_id","-razorpay_payment_id"]).populate({
        path:"product",
        select:"-purchaseCount"
    });

    return res.status(200).json({
      success: true,
      orders: orders,
      authentic:true
    }); // Send the order with populated product details
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = fetchUserOrder;
