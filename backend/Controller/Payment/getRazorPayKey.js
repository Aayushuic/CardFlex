const getRazorKey = async (req, res) => {
  try {
    res.status(200).json({ success: true, key: process.env.RAZOR_PAY_KEYID });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = getRazorKey;
