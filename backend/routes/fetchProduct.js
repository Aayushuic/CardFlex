const express = require("express");
const fetchLatestProduct = require("../Controller/fetchProduct/fetchLatestProduct");
const paginateFetchProduct = require("../Controller/fetchProduct/paginatedFetchProduct");
const fetchSearchProducts = require("../Controller/fetchProduct/fetchSearchedProducts");
const router = express.Router();

router.get("/getlatest",fetchLatestProduct );
router.post("/fetchproducts",paginateFetchProduct);
router.post("/search",fetchSearchProducts);

module.exports = router;
