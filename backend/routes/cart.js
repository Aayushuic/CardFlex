const express = require("express");
const addToCart = require("../Controller/Cart/addToCart");
const isAuhtenticated = require("../middleware/isAuthenticated");
const removeFromCart = require("../Controller/Cart/removeFromCart");
const router = express.Router();

router.patch("/add",isAuhtenticated,addToCart);
router.patch("/remove",isAuhtenticated,removeFromCart);

module.exports = router;
