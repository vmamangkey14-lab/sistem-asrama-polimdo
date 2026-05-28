const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const {
  loginAdmin,
} = require("../controllers/adminController");

// REGISTER
router.post(
  "/register",
  register
);

// LOGIN MAHASISWA
router.post(
  "/login",
  login
);

// LOGIN ADMIN
router.post(
  "/login-admin",
  loginAdmin
);

module.exports = router;