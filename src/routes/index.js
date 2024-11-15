const express = require("express");
const authRoutes = require("./auth");
const inventoryRoutes = require("./inventory");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/inventory", inventoryRoutes);

module.exports = router;
