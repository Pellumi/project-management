const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const { recordSale, getDailySales } = require("../controllers/sales");

const router = express.Router();

router.use(protect);

router.post("/", authorize("STAFF", "MANAGER"), recordSale);
router.get("/daily", authorize("ADMIN", "MANAGER"), getDailySales);

module.exports = router;
