const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const {
  getReservations,
  getOrders,
  makeReservation,
  createOrder,
  processBill,
} = require("../controllers/restaurant");

const router = express.Router();

router.use(protect);
router.use(authorize("STAFF", "MANAGER"));

router.get("/reservations", authorize("STAFF", "MANAGER"), getReservations);
router.get("/orders", authorize("STAFF", "MANAGER"), getOrders);
router.post("/reservations", makeReservation);
router.post("/orders", createOrder);
router.post("/bills", processBill);

module.exports = router;
