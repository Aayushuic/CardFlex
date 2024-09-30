const User = require("../../modals/user");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const { email, password, phoneNumber, name } = req.body;

    // Check if all required fields are provided
    if (!email || !password || !phoneNumber || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check if the user already exists by email or phone number
    const isAlreadyUser = await User.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });

    if (isAlreadyUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10); // Changed from 20 to 10 for typical security
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user and save it to the database
    const user = await new User({
      name: name,
      email: email,
      password: hashPassword,
      phoneNumber: phoneNumber,
    }).save();

    // Respond with a success message
    return res
      .status(200)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    // Handle any errors that occur during the process
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error." });
  }
};

module.exports = signUp;
