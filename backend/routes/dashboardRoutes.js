const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

// ADMIN - stats
router.get(
  "/stats",
  verifyToken,
  verifyAdmin,
  getDashboardStats
);

module.exports = router;