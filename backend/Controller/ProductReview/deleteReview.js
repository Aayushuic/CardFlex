const Product = require("../../modals/product");
const User = require("../../modals/user");

const deleteReview = async (req, res) => {
  try {
    const { reviewId, productId } = req.query;

    if (!reviewId || !productId) {
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
        message: "you are not allowed to delete this review",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $pull: { reviews: { _id: reviewId } } },
      { new: true } // Return the updated product document
    ).populate({
      path: "reviews.user",
      select: "name email -_id",
    });

    return res.status(200).json({
      success: true,
      message: "review deleted successfully",
      productReview: updatedProduct.reviews,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = deleteReview;
