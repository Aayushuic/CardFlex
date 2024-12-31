const Product = require("../../modals/product");

const fetchLatestProduct = async (req, res) => {
  try {
    const latestProduct = await Product.find({})
      .select(["-cdrFile","-reviews"])
      .sort({ createdAt: -1 }) // Sort by creation time in descending order
      .limit(9); // Optionally limit the number of products (e.g., 10)
    
    return res.status(200).json({
      success: true,
      data: latestProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = fetchLatestProduct;
