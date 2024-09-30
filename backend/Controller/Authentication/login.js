const User = require("../../modals/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exists" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong Credentials",
      });
    }

    const payload = {
      userId: user._id,
      email: user.email,
    };

    const token = await jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: "15d",
    });

    const cookieOption = {
      httpOnly: true,
      secure: true,
      expires: Date.now() + 21 * 24 * 60 * 60 * 1000,
      maxAge: 21 * 24 * 60 * 60 * 1000,
    };

    const userData = await User.findOne({email:email}).populate({
      path: 'cart',
      select: '-cdrFile' // Exclude the 'cdrFile' field
    }).select("-password");
    res
      .cookie("token", token, cookieOption)
      .status(200)
      .json({
        success: true,
        message: `Welcome back, ${user.name}`,
        user: userData,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = login;
