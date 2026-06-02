const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // ambil header authorization
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Akses ditolak, token tidak ditemukan",
    });
  }

  // format: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Format token tidak valid",
    });
  }

  try {
    // verifikasi token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // simpan data user
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Sesi Anda telah berakhir, silakan login kembali",
      });
    }
    return res.status(403).json({
      message: "Token tidak valid atau tidak dikenali",
    });
  }
};

module.exports = verifyToken;