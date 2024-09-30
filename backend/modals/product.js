const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define category enum based on the titles provided
const categoryEnum = [
  "Invitation Card",
  "Template",
  "ID Card",
  "Banner",
  "Invoice",
];

// Define item enum with all possible items
const itemEnum = [
  "Baby shower",
  "Barsi Card",
  "Bhagwat",
  "Birthday Card",
  "Griha pravesh",
  "Namkaran",
  "Opening",
  "Wedding card",
  "Festival",
  "Poster",
  "Business Card",
  "Menu Card",
  "Certificate",
  "Screen Offset",
  "Company",
  "Employee",
  "Student",
  "Shop Banner",
  "Festival Banner",
  "Bill Book",
  "Letter Head",
  "Rasid Book",
];

// Create the Product schema with the required fields and enums
const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    category: {
      type: String,
      enum: categoryEnum,
      required: true,
    },
    item: {
      type: String,
      enum: itemEnum,
      required: true,
    },
    fileName:{
      type:String,
    },
    imageUrl: { type: String, required: true }, // New field for image URL
    cdrFile: { type: String, required: true }, // New field for CDR file URL
    purchaseCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
