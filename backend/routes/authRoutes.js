const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");

// REGISTER
router.post("/register", authController.register);

// LOGIN MAHASISWA
router.post("/login", authController.login);

// LOGIN ADMIN
router.post("/login-admin", adminController.loginAdmin);

module.exports = router;