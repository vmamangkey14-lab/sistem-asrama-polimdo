const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

const {
  getAllKamar,
  createKamar,
  updateKamar,
  deleteKamar,
} = require("../controllers/kamarController");

// GET ALL (Mahasiswa & Admin)
router.get(
  "/",
  verifyToken,
  getAllKamar
);

// CREATE (Admin Only)
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  createKamar
);

// UPDATE (Admin Only)
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  updateKamar
);

// DELETE (Admin Only)
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteKamar
);

module.exports = router;