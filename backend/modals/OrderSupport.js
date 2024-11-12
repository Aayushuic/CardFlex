const mongoose = require('mongoose');

// Define the schema for a support request
const supportRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: 'Order', // Reference to the Order model
      required: true, // Assuming every support request is linked to an order
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
      match: /^[0-9]+$/, // Only numeric values allowed
    },
    issue: {
      type: String,
      required: true, // Removed enum validation
    },
    additionalDetails: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    status: {
      type: String,
      default: 'Pending', // Status of the request (could be Pending, Resolved, etc.)
      enum: ['Pending', 'Resolved', 'In Progress'],
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the model
const OrderSupport = mongoose.model('OrderSupport', supportRequestSchema);

module.exports = OrderSupport;
