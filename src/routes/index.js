const express = require("express");
const authRoutes = require("./auth");
const inventoryRoutes = require("./inventory");
const salesRoutes = require("./sales");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/sales", salesRoutes);

module.exports = router;
