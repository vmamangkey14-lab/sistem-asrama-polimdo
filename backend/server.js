const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");
const kamarRoutes = require("./routes/kamarRoutes");
const pendaftaranRoutes = require("./routes/pendaftaranRoutes");
const adminRoutes = require("./routes/adminRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

const mahasiswaRoutes =
require("./routes/mahasiswaRoutes");
const pembayaranRoutes = require("./routes/pembayaranRoutes");

const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/kamar", kamarRoutes);
app.use("/api/pendaftaran", pendaftaranRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pembayaran", pembayaranRoutes);

app.get(
  "/api/protected",
  verifyToken,
  (req, res) => {
    res.json({
      message: "Akses berhasil",
      user: req.user,
    });
  }
);

app.get("/", (req, res) => {
  res.send("API Sistem Asrama Berjalan...");
});

app.get("/test-db", async (req, res) => {
  try {
    const [result] = await db.query("SELECT 1");
    res.json({
      message: "Database connected",
      result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

