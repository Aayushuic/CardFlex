const mongoose = require("mongoose");
const Order = require("../../modals/order");
const Product = require("../../modals/product"); // Import the Product model
const instance = require("../../utils/razorpayinstance");

const createOrderInstance = async (req, res) => {
  const { amount, name, email, phoneNumber, product, userId,discountPercentage} = req.body; 
  // Validate request body

  if (
    !name ||
    !email ||
    !phoneNumber ||
    !amount ||
    !Array.isArray(product) ||
    product.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Invalid Request", success: false });
  }

  try {
    const productIds = product.map((id) => new mongoose.Types.ObjectId(id));

    const existingProducts = await Product.find({ _id: { $in: productIds } });

    const validAmount = await existingProducts.reduce((total,product)=>total+product.newPrice,0);
    if(amount!=validAmount){
      return res.status(400).json({success:false,message:"amount validation failed"})
    }

    const discount = validAmount * discountPercentage / 100;
    const orderAmount = Math.floor(validAmount - discount); 

    if (existingProducts.length !== productIds.length) {
      return res.status(400).json({
        message: "One or more products do not exist",
        success: false,
      });
    }

    const options = {
      amount: Math.round(orderAmount * 100), // Convert to paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`, 
    };

    const order = await instance.orders.create(options);

    console.log(order)

    if (order.status === "created") {
      console.log("Razorpay order created:", order); // Save the order in the database

      const currentOrder = new Order({
        name,
        email,
        phoneNumber,
        razorpay_order_id: order.id,
        amount: order.amount / 100,
        product: productIds,
        user: userId || null,
        receipt:order?.receipt,
        discountPercentage
      });
      await currentOrder.save();

      console.log("Order saved in database:", currentOrder);

      return res.json({
        success: true,
        orderId: currentOrder._id,
        razorpay_order_id: order.id,
        order_amount:amount,
      });
    } // Razorpay order creation failed

    return res
      .status(500)
      .json({ success: false, message: "Order creation failed" });
  } catch (error) {
    // console.error("Error creating Razorpay order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = createOrderInstance;
