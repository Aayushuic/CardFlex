const mongoose = require("mongoose");

// Define the schema for a support request
const supportRequestSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    unique: true, // Ensure the ticket number is unique
    required: true, // Make ticketNumber required
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order", // Reference to the Order model
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
    required: true,
  },
  additionalDetails: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 300,
  },
  status: {
    type: String,
    enum: ["Open", "Closed"],
    default: "Open", // Default status of the request
  },
  resolvedAt: {
    type: Date,
  },
  messages: [
    {
      message: {
        type: String,
        required: true,
        maxlength: 1000,
      },
      sentAt: {
        type: Date,
        default: Date.now,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Set the TTL for 30 seconds (MongoDB TTL will delete after 30 sec)
  },
});

// Pre-validate hook to generate the ticket number
supportRequestSchema.pre("validate", async function (next) {
  if (!this.ticketNumber) {
    try {
      const latestTicket = await this.constructor
        .findOne()
        .sort({ createdAt: -1 })
        .limit(1); // Get the latest ticket
      let ticketNumber;

      if (latestTicket) {
        // Increment the last ticket number if tickets exist
        ticketNumber = parseInt(latestTicket.ticketNumber, 10) + 1;
      } else {
        // If no tickets exist, start from 000119
        ticketNumber = 119;
      }

      // Format the ticket number as a 6-digit number, e.g., 000119 or 000120
      this.ticketNumber = ticketNumber.toString().padStart(5, "0");
    } catch (error) {
      console.error("Error generating ticket number:", error);
      return next(error);
    }
  }
  next(); // Continue with validation after generating the ticket number
});

// Create the model
const OrderSupport = mongoose.model("OrderSupport", supportRequestSchema);

module.exports = OrderSupport;
