const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");
const kamarRoutes = require("./routes/kamarRoutes");
const pendaftaranRoutes = require("./routes/pendaftaranRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
const pembayaranRoutes = require("./routes/pembayaranRoutes");

const path = require("path");

const app = express();

// =====================================
// 🔥 CORS FIX PALING AMAN & FLEXIBLE
// =====================================
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(cors({
  origin: function (origin, callback) {
    // Izinkan request tanpa origin (seperti curl, mobile app, postman, dll)
    if (!origin) return callback(null, true);
    
    // Check if origin matches allowed list, wildcard '*', or ends with .netlify.app
    const isAllowed = allowedOrigins.some(o => o === "*" || o.replace(/\/$/, "") === origin.replace(/\/$/, "")) ||
                      origin.endsWith(".netlify.app");

    if (isAllowed) {
      callback(null, true);
    } else {
      if (process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        console.warn(`[CORS] Blocked origin in production: ${origin}`);
        callback(null, false);
      }
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// =====================================
// MIDDLEWARE & STATIC DIR
// =====================================
app.use(express.json());

// Ensure uploads folder exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/uploads", express.static(uploadDir));

// =====================================
// ROUTES
// =====================================
app.use("/api/auth", authRoutes);
app.use("/api/kamar", kamarRoutes);
app.use("/api/pendaftaran", pendaftaranRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pembayaran", pembayaranRoutes);

// =====================================
// TEST
// =====================================
app.get("/", (req, res) => {
  res.send("API Sistem Asrama Berjalan...");
});

// =====================================
// GLOBAL ERROR HANDLER (Multer & General Errors)
// =====================================
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("🔥 Multer error:", err);
    return res.status(400).json({
      message: `File upload error: ${err.message}`,
    });
  } else if (err) {
    console.error("🔥 General error:", err);
    return res.status(500).json({
      message: err.message || "Terjadi kesalahan pada server",
    });
  }
  next();
});

// =====================================
// START SERVER
// =====================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});