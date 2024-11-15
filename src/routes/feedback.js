const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const { submitFeedback, getFeedback } = require("../controllers/feedback");

const router = express.Router();

router.use(protect);

router.post("/", submitFeedback); // Allow all authenticated users
router.get("/", authorize("ADMIN", "MANAGER"), getFeedback);

module.exports = router;
