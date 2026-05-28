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

const authMiddleware = require("../middleware/authMiddleware");

// ======================================
// MAHASISWA
// ======================================

// DAFTAR ASRAMA / BUAT PENDAFTARAN
router.post(
  "/create",
  authMiddleware,
  createPendaftaran
);

// LIHAT STATUS PENDAFTARAN MAHASISWA SENDIRI
router.get(
  "/status",
  authMiddleware,
  getStatusMahasiswa
);

// Fallbacks for backward compatibility
router.post("/daftar", authMiddleware, createPendaftaran);
router.post("/", authMiddleware, createPendaftaran);

// ======================================
// ADMIN
// ======================================

// GET ALL PENDAFTARAN
router.get(
  "/all",
  getAllPendaftaran
);

router.get(
  "/",
  getAllPendaftaran
);

// APPROVE
router.put(
  "/approve/:id",
  approvePendaftaran
);

// REJECT
router.put(
  "/reject/:id",
  rejectPendaftaran
);

// REOPEN
router.put(
  "/reopen/:id",
  reopenPendaftaran
);

// Fallbacks for backward compatibility
router.put("/verifikasi/:id", approvePendaftaran);
router.put("/tolak/:id", rejectPendaftaran);
router.put("/tempatkan/:id", approvePendaftaran);

module.exports = router;