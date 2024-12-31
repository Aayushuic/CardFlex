const Product = require("../../modals/product");

const fetchReview = async (req, res) => {
  try {
    const { productId } = req.query;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "bad request",
      });
    }

    const product = await Product.findById(productId).populate({
      path: "reviews.user",
      select: "name email -_id",
    });

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "invalid  request" });
    }

    return res.status(200).json({
      success: true,
      message: "fetched successfully",
      productReview: product.reviews,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = fetchReview;
