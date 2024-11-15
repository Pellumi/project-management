const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const { generateDailyReport } = require("../controllers/reports");

const router = express.Router();

router.use(protect);
router.use(authorize("ADMIN", "MANAGER")); // Restrict all report routes

router.get("/daily", generateDailyReport);

module.exports = router;
