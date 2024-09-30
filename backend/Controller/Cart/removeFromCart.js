const User = require("../../modals/user");

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate productId
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Oops! Bad Request - Product ID is required",
      });
    }

    // Find the user
    const user = await User.findById(req._id).populate("cart");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the product exists in the cart
    const productExistsInCart = user.cart.some(
      (item) => item._id.toString() === productId
    );

    if (!productExistsInCart) {
      return res.status(400).json({
        success: false,
        message: "Product not found in the cart",
      });
    }

    // Remove the product from the cart
    user.cart = user.cart.filter((item) => item._id.toString() !== productId);
    await user.save();

    // Cart is already populated, so no need to query again
    return res.status(200).json({
      success: true,
      message: "Item remove from cart",
      cart: user.cart,  
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

module.exports = removeFromCart;
