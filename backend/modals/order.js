const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
      unique: true,
    },
    product: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Set the TTL for 30 seconds (MongoDB TTL will delete after 30 sec)
      expires: '20d',
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "failed", "successful","refunded","refund_processed","cancelled"],
      default: "pending",
    },
    paymentMethod:{
      type:String,
      default:null    
    },
    refundAmount:{
      type:String,
      default:null,
    },
    refund_id:{
      type:String,
      default:null,
    },
    razorpay_payment_id: {
      type: String,
      default: null,
    },
    receipt: {
      type: String,
      default: null,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
  },
);

// Create the model for the Order
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
