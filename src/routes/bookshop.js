const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const {
  addBook,
  processPurchase,
  processReturn,
} = require("../controllers/bookshop");

const router = express.Router();

router.use(protect);

router.post("/books", authorize("MANAGER"), addBook);
router.post("/purchases", authorize("STAFF", "MANAGER"), processPurchase);
router.post("/returns", authorize("STAFF", "MANAGER"), processReturn);

module.exports = router;
