const express = require("express");
const addProduct = require("../../Controller/AddProduct/addProduct");

const router = express.Router();

router.post("/addproduct", addProduct);

module.exports = router;
