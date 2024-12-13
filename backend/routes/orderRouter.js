const express = require("express");
const router = express.Router();
const fetchOrderToDownload = require("../Controller/orders/fetchOrderToDownload");
const isAuthenticated = require("../middleware/isAuthenticated");
const checkFirstOrder = require("../Controller/orders/checkFirstOrder");
const fetchUserOrder = require("../Controller/orders/fetchUserOrder");
const createSupportRequest = require("../Controller/orders/orderSupport");
const fetchTicket = require("../Controller/orders/fetchOrderSupportTicket");
const orderSupportChat = require("../Controller/orders/orderSupportChat");
const { cancelOrder } = require("../Controller/orders/cancelOrder");

router.get("/:orderId/token/:paymentId", fetchOrderToDownload);
router.get("/check-first-order", isAuthenticated, checkFirstOrder);
router.get("/getOrders", isAuthenticated, fetchUserOrder);
router.post("/support", isAuthenticated, createSupportRequest);
router.get("/support/ticket", isAuthenticated, fetchTicket);
router.post("/support/ticket/chat", isAuthenticated, orderSupportChat);
router.patch("/cancel", cancelOrder);

module.exports = router;
