const express = require("express");
const router = express.Router();
const fetchOrderToDownload = require("../Controller/orders/fetchOrderToDownload");
const isAuthenticated = require("../middleware/isAuthenticated");
const checkFirstOrder = require("../Controller/orders/checkFirstOrder");
const fetchUserOrder = require("../Controller/orders/fetchUserOrder");
const createSupportRequest = require("../Controller/orders/orderSupport");

router.get("/:orderId/token/:paymentId", fetchOrderToDownload);
router.get("/check-first-order", isAuthenticated, checkFirstOrder);
router.get("/getOrders", isAuthenticated, fetchUserOrder);
router.post("/support", isAuthenticated,createSupportRequest);


module.exports = router;
