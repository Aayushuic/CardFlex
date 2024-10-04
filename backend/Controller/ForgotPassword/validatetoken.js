const User = require("../../modals/user.js")
const ForgotToken = require("../../modals/ForgotToken.js");

const validateToken = async (req, res) => {
  try {
    const { id, token } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
     return res.render("invalid.ejs",{message:"invalid action"});
    }

    const verifyToken = await ForgotToken.findOne({
      userId: id,
      token: token,
    });

    if (!verifyToken) {
      return res.render("invalid.ejs",{message:"invalid link or link expired"});
    }

    res.render("forgotPassword.ejs", { userId: id, token: token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

module.exports = validateToken;
