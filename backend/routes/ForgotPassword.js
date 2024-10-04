const express = require("express");
const sendForgotLink = require("../Controller/ForgotPassword/sendForgotLink");
const validateToken = require("../Controller/ForgotPassword/validatetoken");
const resetPassword = require("../Controller/ForgotPassword/resetPassword");
const router = express.Router();

router.post("/forgot-password",sendForgotLink);
router.get("/:id/password/:token",validateToken);
router.post("/password",resetPassword);

module.exports = router;
