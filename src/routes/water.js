const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const {
  recordProduction,
  createDistributionOrder,
  updateDistributionStatus,
} = require("../controllers/water");

const router = express.Router();

router.use(protect);

router.post("/production", authorize("MANAGER"), recordProduction);
router.post(
  "/distribution",
  authorize("STAFF", "MANAGER"),
  createDistributionOrder,
);
router.patch(
  "/distribution/:id",
  authorize("STAFF", "MANAGER"),
  updateDistributionStatus,
);

module.exports = router;