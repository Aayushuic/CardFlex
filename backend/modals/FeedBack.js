const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Rating is required"], // Required field with custom message
      min: [0, "Rating must be between 0 and 5"],  // Min validation
      max: [5, "Rating must be between 0 and 5"],  // Max validation
    },
    feedback: {
      type: String,
    },
    user: { 
      type: mongoose.Schema.ObjectId, 
      ref: "User", 
      default:null
    },
    name: {
      type: String,
      required: [true, "Name is required"], // Required field for name
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Feedback model
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
