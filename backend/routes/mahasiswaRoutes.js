const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

const upload =
require("../middleware/uploadMiddleware");

const {
  getAllMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
  uploadFotoProfile
} = require("../controllers/mahasiswaController");


// GET ALL (Admin Only)
router.get(
  "/",
  verifyToken,
  verifyAdmin,
  getAllMahasiswa
);

// UPDATE (Admin Only)
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  updateMahasiswa
);

// DELETE (Admin Only)
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteMahasiswa
);

// UPLOAD FOTO (Student self)
router.post(
  "/upload-foto",
  verifyToken,
  upload.single("foto"),
  uploadFotoProfile
);

module.exports = router;