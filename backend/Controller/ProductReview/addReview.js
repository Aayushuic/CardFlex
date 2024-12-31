const Product = require("../../modals/product");
const User = require("../../modals/user");

const addReview = async (req, res) => {
  try {
    const { productId, comment, rating } = req.body;

    // Validate request body
    if (!productId || !rating) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: productId, comment, rating",
      });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    // Find the user
    const user = await User.findById(req._id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Check if user purchased the product
    const hasPurchased = user.purchasedItem.some(
      (itemId) => itemId.toString() === productId.toString()
    );
    if (!hasPurchased) {
      return res.status(400).json({
        success: false,
        message:
          "It seems you haven’t purchased this item yet,You need to purchase this item to leave a review",
      });
    }

    const existingReview = product.reviews.find(
      (review) => review.user.toString() === req._id.toString()
    );
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    product.reviews.push({
      rating,
      comment,
      user: req._id,
    });

    // Save the updated product
    await product.save();

    const updateProduct = await Product.findById(productId).populate({
      path: "reviews.user",
      select: "name email -_id",
    });

    return res.status(200).json({
      success: true,
      message: "Review posted successfully",
      productReview: updateProduct.reviews,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = addReview;
