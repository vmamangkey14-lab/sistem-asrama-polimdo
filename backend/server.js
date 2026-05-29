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
// 🔥 CORS FIX PALING AMAN
// =====================================
app.use(cors({
  origin: "*", // sementara biar pasti lolos
}));

// HANDLE PREFLIGHT
app.options("/*", cors());

// =====================================
// MIDDLEWARE
// =====================================
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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