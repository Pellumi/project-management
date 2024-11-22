const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const {
  getBooks,
  getPurchases,
  addBook,
  processPurchase,
  processReturn,
} = require("../controllers/bookshop");

const router = express.Router();

router.use(protect);

router.get("/books", authorize("STAFF", "MANAGER"), getBooks);
router.get("/purchases", authorize("MANAGER"), getPurchases);
router.post("/books", authorize("MANAGER"), addBook);
router.post("/purchases", authorize("STAFF", "MANAGER"), processPurchase);
router.post("/returns", authorize("STAFF", "MANAGER"), processReturn);

module.exports = router;
