const User = require("../../modals/user");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate productId
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Oops! Bad Request - Product ID is required",
      });
    }

    // Find the user and populate the cart
    const user = await User.findById(req._id).populate("cart");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the product is already in the cart
    const productExistsInCart = user.cart.some(
      (item) => item._id.toString() === productId
    );

    if (productExistsInCart) {
      return res.status(200).json({
        success: false,
        message: "Product already present in your cart",
      });
    }

    // Add the product to the cart if it's not there
    user.cart.push(productId);
    await user.save();

    // Populate the cart after saving the new product
    await user.populate("cart");

    return res.status(200).json({
      success: true,
      message: "Item add to cart",
      cart: user.cart, 
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

module.exports = addToCart;
