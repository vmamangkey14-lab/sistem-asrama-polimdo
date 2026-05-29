const db = require("../config/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// =======================
// LOGIN ADMIN
// =======================

exports.loginAdmin = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // CARI ADMIN

    const [rows] = await db.query(
      `
      SELECT * FROM admin
      WHERE email = ?
      `,
      [email]
    );

    // ADMIN TIDAK ADA

    if (rows.length === 0) {

      return res.status(400).json({
        message:
          "Admin tidak ditemukan",
      });

    }

    const admin = rows[0];

    // CEK PASSWORD

    const isMatch = password === admin.password;

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Password salah",
      });

    }

    // TOKEN

    const token = jwt.sign(

      {
        id: admin.id,
        role: "admin",
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      }

    );

    res.status(200).json({

      message:
        "Login admin berhasil",

      token,

      admin: {

        id: admin.id,
        nama: admin.nama,
        email: admin.email,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });

  }

};