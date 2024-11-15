const express = require("express");
const authRoutes = require("./auth");
const inventoryRoutes = require("./inventory");
const salesRoutes = require("./sales");
const feedbackRoutes = require("./feedback");
const reportsRoutes = require("./reports");
const restaurantRoutes = require("./restaurant");
const bookshopRoutes = require("./bookshop");
const waterRoutes = require("./water");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/sales", salesRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/reports", reportsRoutes);
router.use("/restaurant", restaurantRoutes);
router.use("/bookshop", bookshopRoutes);
router.use("/water", waterRoutes);

module.exports = router;
