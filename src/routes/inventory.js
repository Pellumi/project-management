const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const { addItem, getItems, updateStock } = require("../controllers/inventory");

const router = express.Router();

router.use(protect);

router.post("/", authorize("ADMIN", "MANAGER"), addItem);
router.get("/", authorize("ADMIN", "MANAGER", "STAFF"), getItems);
router.patch("/:id/stock", authorize("ADMIN", "MANAGER", "STAFF"), updateStock);

module.exports = router;
