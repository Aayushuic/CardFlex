const Product = require("../../modals/product"); // Adjust the path according to your folder structure

const addProduct = async (req, res) => {
  try {
    // Destructure the required fields from req.body
    const {
      title,
      description,
      oldPrice,
      newPrice,
      category,
      item,
      imageUrl,
      cdrFile,
    } = req.body;

    // Check for missing fields
    if (
      !title ||
      !description ||
      !oldPrice ||
      !newPrice ||
      !category ||
      !item ||
      !imageUrl ||
      !cdrFile
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check if the category and item values are valid enums
    const validCategories = [
      "Invitation Card",
      "Template",
      "ID Card",
      "Banner",
      "Invoice",
    ];
    const validItems = [
      "Baby shower",
      "Barsi Card",
      "Bhagwat",
      "Birthday",
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

    if (!validCategories.includes(category) || !validItems.includes(item)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category or item value." });
    }

    // Create a new product instance
    const newProduct = new Product({
      title,
      description,
      oldPrice,
      newPrice,
      category,
      item,
      imageUrl,
      cdrFile,
    });

    // Save the product to the database
    await newProduct.save();

    // Send a success response
    return res.status(201).json({
      success: true,
      message: "Product added successfully.",
      product: newProduct,
    });
  } catch (error) {
    // Handle any errors that occur
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};

module.exports = addProduct;
