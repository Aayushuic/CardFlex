const express = require("express");
const paymentVerification = require("../Controller/Payment/paymentVerification");
const createOrderInstance = require("../Controller/Payment/creatingOrderInstance");
const apiKeyMiddleware = require("../middleware/apiKeyMiddleWare");
const getRazorKey = require("../Controller/Payment/getRazorPayKey");
const { paymentStatus } = require("../Controller/Payment/PaymentStatus");


const router = express.Router();
router.post("/checkout",apiKeyMiddleware,createOrderInstance);
router.post("/payment-verification",paymentVerification);
router.get("/getRazorpayKey",apiKeyMiddleware,getRazorKey);
router.get("/status",apiKeyMiddleware,paymentStatus);


module.exports = router;
