const Razorpay = require("razorpay");
const RAZOR_PAY_KEYID =
  process.env.NODE_ENV === "production"
    ? process.env.RAZOR_PAY_KEYID
    : process.env.LOCAL_RAZOR_PAY_KEYID;
const RAZOR_PAY_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.RAZOR_PAY_SECRET
    : process.env.LOCAL_RAZOR_PAY_SECRET;
const instance = new Razorpay({
  key_id: RAZOR_PAY_KEYID,
  key_secret: RAZOR_PAY_SECRET,
});

module.exports = instance;
