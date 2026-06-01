const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =====================================
// REGISTER MAHASISWA
// =====================================
exports.register = async (req, res) => {
  try {
    const {
      nama,
      nim,
      jurusan,
      gender,
      no_hp,
      email,
      password,
    } = req.body;

    // VALIDASI
    if (!nama || !nim || !jurusan || !gender || !no_hp || !email || !password) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    // CEK EMAIL
    const [checkEmail] = await db.query(
      "SELECT * FROM mahasiswa WHERE email = ?",
      [email]
    );

    if (checkEmail.length > 0) {
      return res.status(400).json({
        message: "Email sudah digunakan",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // INSERT MAHASISWA
    const [result] = await db.query(
      `
      INSERT INTO mahasiswa
      (nama, nim, jurusan, gender, no_hp, email, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [nama, nim, jurusan, gender, no_hp, email, hashedPassword]
    );

    const mahasiswaId = result.insertId;

    // INSERT PENDAFTARAN (FIX FINAL)
    await db.query(
      `
      INSERT INTO pendaftaran
      (mahasiswa_id, kamar_id, tanggal_daftar, status_pendaftaran)
      VALUES (?, ?, NOW(), ?)
      `,
      [mahasiswaId, null, "Menunggu Verifikasi"]
    );

    res.status(201).json({
      message: "Register berhasil",
    });

  } catch (error) {
    console.log("🔥 ERROR REGISTER:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// LOGIN MAHASISWA
// =====================================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    const [rows] = await db.query(
      "SELECT * FROM mahasiswa WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        message: "Email tidak ditemukan",
      });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: "mahasiswa" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        nim: user.nim,
        jurusan: user.jurusan,
        gender: user.gender,
        no_hp: user.no_hp,
        foto_profile: user.foto_profile,
      },
    });

  } catch (error) {
    console.log("🔥 ERROR LOGIN:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};