const express = require("express");
const authRoutes = require("./auth");
const inventoryRoutes = require("./inventory");
const salesRoutes = require("./sales");
const feedbackRoutes = require("./feedback");
const reportsRoutes = require("./reports");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/sales", salesRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/reports", reportsRoutes);

module.exports = router;
