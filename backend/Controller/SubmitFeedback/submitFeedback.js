const Feedback = require("../../modals/FeedBack");

const submitfeedBack = async (req, res) => {
  try {
    const { rating, feedback, user, name } = req.body;

    if (!rating || !name) {
      return res.status(400).json({success:false, message: "Rating and name are required." });
    }


    // Create a new feedback entry
    const newfeedback = new Feedback({ rating, feedback, user, name });

    await newfeedback.save();

    res.status(200).json({success:true});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: "Failed to submit feedback." });
  }
};

module.exports = submitfeedBack;
