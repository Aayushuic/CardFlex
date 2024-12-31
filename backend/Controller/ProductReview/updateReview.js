const Product = require("../../modals/product");
const User = require("../../modals/user");

const updateReview = async (req, res) => {
  try {
    const { reviewId, productId, comment, rating } = req.body;

    if (!reviewId || !productId || !rating) {
      return res
        .status(400)
        .json({ success: false, message: "invalid request" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "invalid request, no product found" });
    }

    const review = product.reviews.id(reviewId);

    if (review.user.toString() != req._id) {
      return res.status(400).json({
        success: false,
        message: "you are not allowed to edit this review",
      });
    }

    review.rating = rating;
    review.comment = comment;

    await product.save();

    const newUpdatedProduct = await Product.findById(productId).populate({
      path: "reviews.user",
      select: "name email -_id",
    });

    return res.status(200).json({
      success: true,
      message: "review updated successfully",
      productReview: newUpdatedProduct.reviews,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = updateReview;
