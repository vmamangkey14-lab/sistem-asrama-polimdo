const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // ambil header authorization
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token tidak ada",
    });
  }

  // format: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token invalid",
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
    return res.status(403).json({
      message: "Token tidak valid",
    });
  }
};

module.exports = verifyToken;