const Razorpay = require('razorpay');
const instance = new Razorpay({ key_id:process.env.RAZOR_PAY_KEYID, key_secret: process.env.RAZOR_PAY_SECRET })


module.exports = instance;