const express = require("express");
const cors = require("cors");
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
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      if (process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true
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
// START SERVER
// =====================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});