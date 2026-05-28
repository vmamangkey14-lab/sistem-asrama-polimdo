const express = require("express");

const router = express.Router();

const {
  loginAdmin,
} = require("../controllers/adminController");

// LOGIN ADMIN
router.post(
  "/login",
  loginAdmin
);

module.exports = router;