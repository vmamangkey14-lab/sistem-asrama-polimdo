const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadPembayaran,
  getPembayaranStatus,
  getAllPembayaran,
  verifyPembayaran,
} = require("../controllers/pembayaranController");

// ======================================
// MAHASISWA
// ======================================

// UPLOAD BUKTI PEMBAYARAN
router.post(
  "/upload",
  verifyToken,
  upload.single("bukti_pembayaran"),
  uploadPembayaran
);

// STATUS PEMBAYARAN MAHASISWA
router.get(
  "/status",
  verifyToken,
  getPembayaranStatus
);

// ======================================
// ADMIN
// ======================================

// GET ALL DATA PEMBAYARAN
router.get(
  "/all",
  verifyToken,
  verifyAdmin,
  getAllPembayaran
);

// VERIFIKASI PEMBAYARAN (SETUJUI / TOLAK)
router.put(
  "/verifikasi/:id",
  verifyToken,
  verifyAdmin,
  verifyPembayaran
);

module.exports = router;
