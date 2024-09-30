const express = require("express");
const login = require("../Controller/Authentication/login");
const signUp = require("../Controller/Authentication/signup");
const logout = require("../Controller/Authentication/logout");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.get("/logout", logout);

module.exports = router;
