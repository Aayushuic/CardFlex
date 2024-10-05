const express = require("express");
const login = require("../Controller/Authentication/login");
const signUp = require("../Controller/Authentication/signup");
const logout = require("../Controller/Authentication/logout");
const submitContactForm = require("../Controller/Contact/contact");


const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.get("/logout", logout);
router.post("/contact",submitContactForm);

module.exports = router;
