const User = require("../../modals/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const EmailToken = require("../../modals/EmailToken");
const crypto = require("crypto");
const sendVerificationEmail = require("../../utils/VerificationContent");
const sendEmail = require("../../utils/EmailConfig");


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

    if(user.verified==false){
      const isToken = await EmailToken.findOne({userId:user._id});

      if(isToken){
        return res.status(400).json({
          success: false,
          message: "please verify your email",
        });
      }

      const emailToken = await new EmailToken({
        userId: user?._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
  
      const verificationUrl = `https://card-flex-in.vercel.app/api/user/verify/${user._id}/${emailToken.token}`;
  
      const emailContent = sendVerificationEmail(user.name, verificationUrl);
  
      const isSuccess = await sendEmail(
        user.email,
        "CardFlex - Email Verification",
        emailContent
      );

      if (!isSuccess) {
        await emailToken.deleteOne();
        return res.status(500).json({
          success: false,
          message: "something went wrong,try again later",
        });
      }

      return res.status(200).json({
        success: false,
        message: "Email sent — please verify your account",
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
      signed:true
    };

    const userData = await User.findOne({email:email}).populate({
      path: 'cart',
      select: '-cdrFile' // Exclude the 'cdrFile' field
    }).select("-password");
    res
      .cookie("token", token, cookieOption,)
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
