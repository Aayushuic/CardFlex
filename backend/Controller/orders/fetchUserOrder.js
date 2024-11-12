const Order = require("../../modals/order");

const fetchUserOrder = async (req, res) => {
  try {
    const userId = req._id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "unauthenticated", authentic: false });
    }

    // Fetch orders and populate product details
    const orders = await Order.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .select(["-user", "-_id", "-razorpay_payment_id"])
      .populate({
        path: "product",
        select: "-purchaseCount",
      });

    // Process orders to conditionally include CDR files in each product
    const processedOrders = orders.map((order) => {
      const orderData = order.toObject();
      
      // Iterate over each product in the product array
      orderData.product = orderData.product.map((product) => {
        if (order.paymentStatus !== "successful") {
          // Remove the cdrFile if payment is not successful
          delete product.cdrFile;
        }
        return product;
      });

      return orderData;
    });

    // console.log(processedOrders);

    return res.status(200).json({
      success: true,
      orders: processedOrders,
      authentic: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = fetchUserOrder;
