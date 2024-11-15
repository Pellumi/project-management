const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const {
  makeReservation,
  createOrder,
  processBill,
} = require("../controllers/restaurant");

const router = express.Router();

router.use(protect);
router.use(authorize("STAFF", "MANAGER"));

router.post("/reservations", makeReservation);
router.post("/orders", createOrder);
router.post("/bills", processBill);

module.exports = router;
