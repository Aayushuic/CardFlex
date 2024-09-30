const User = require("../../modals/user");

const checkFirstOrder = async (req, res) => {
  try {
    const userId = req._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "invalid request" });
    }

    if(user.isFirst){
        return res.status(200).json({ success: true, isFirst: true }); 
    }

    return res.status(200).json({ success: false, message:"Sorry, you are not eligible",isFirst:false}); // Send the order with populated product details
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = checkFirstOrder;
