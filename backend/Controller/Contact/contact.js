// controllers/contactController.js
const Contact = require("../../modals/Contact");

// Controller function to handle contact form submission
const submitContactForm = async (req, res) => {
  const { name, email, phoneNumber, subject, message } = req.body;
  console.log(req.body)

  // Validate the input data
  if (!name || !email || !phoneNumber || !subject) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all required fields." });
  }

  try {
    // Create a new contact entry
    const contact = new Contact({
      name,
      email,
      phoneNumber,
      subject,
      message, // message is optional
    });

    // Save the contact entry to the database
    await contact.save();

    res.status(201).json({ success:true,message: "save successfully",saved:true });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ message: "Failed to submit contact form.",success:false });
  }
};

module.exports = submitContactForm;
