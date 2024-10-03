const express = require("express");
const EmailVerification = require("../Controller/Verification/EmailVerification");

const router = express.Router();

router.get("/:id/:token", EmailVerification);

module.exports = router;
