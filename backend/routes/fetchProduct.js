const express = require("express");
const fetchLatestProduct = require("../Controller/fetchProduct/fetchLatestProduct");
const paginateFetchProduct = require("../Controller/fetchProduct/paginatedFetchProduct");
const fetchSearchProducts = require("../Controller/fetchProduct/fetchSearchedProducts");
const addReview = require("../Controller/ProductReview/addReview");
const isAuthenticated = require("../middleware/isAuthenticated");
const fetchReview = require("../Controller/ProductReview/fetchReview");
const updateReview = require("../Controller/ProductReview/updateReview");
const deleteReview = require("../Controller/ProductReview/deleteReview");
const router = express.Router();

router.get("/getlatest", fetchLatestProduct);
router.post("/fetchproducts", paginateFetchProduct);
router.post("/search", fetchSearchProducts);

// review routes
router.post("/review", isAuthenticated, addReview);
router.patch("/review", isAuthenticated, updateReview);
router.get("/review", fetchReview);
router.delete("/review", isAuthenticated, deleteReview);

module.exports = router;
