const express = require("express");
const router = express.Router();

const {
  createPendaftaran,
  getStatusMahasiswa,
  getAllPendaftaran,
  approvePendaftaran,
  rejectPendaftaran,
  reopenPendaftaran,
} = require("../controllers/pendaftaranController");

const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

// ======================================
// MAHASISWA
// ======================================

// DAFTAR ASRAMA / BUAT PENDAFTARAN
router.post(
  "/create",
  verifyToken,
  createPendaftaran
);

// LIHAT STATUS PENDAFTARAN MAHASISWA SENDIRI
router.get(
  "/status",
  verifyToken,
  getStatusMahasiswa
);

// Fallbacks for backward compatibility
router.post("/daftar", verifyToken, createPendaftaran);
router.post("/", verifyToken, createPendaftaran);

// ======================================
// ADMIN
// ======================================

// GET ALL PENDAFTARAN
router.get(
  "/all",
  verifyToken,
  verifyAdmin,
  getAllPendaftaran
);

router.get(
  "/",
  verifyToken,
  verifyAdmin,
  getAllPendaftaran
);

// APPROVE
router.put(
  "/approve/:id",
  verifyToken,
  verifyAdmin,
  approvePendaftaran
);

// REJECT
router.put(
  "/reject/:id",
  verifyToken,
  verifyAdmin,
  rejectPendaftaran
);

// REOPEN
router.put(
  "/reopen/:id",
  verifyToken,
  verifyAdmin,
  reopenPendaftaran
);

// Fallbacks for backward compatibility
router.put("/verifikasi/:id", verifyToken, verifyAdmin, approvePendaftaran);
router.put("/tolak/:id", verifyToken, verifyAdmin, rejectPendaftaran);
router.put("/tempatkan/:id", verifyToken, verifyAdmin, approvePendaftaran);

module.exports = router;