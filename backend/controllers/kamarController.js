const db = require("../config/db");

// ======================================
// GET ALL KAMAR
// ======================================

exports.getAllKamar = async (req, res) => {

  try {

    const [rows] = await db.query(
      `
      SELECT *
      FROM kamar
      ORDER BY id DESC
      `
    );

    res.status(200).json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });

  }

};

// ======================================
// TAMBAH KAMAR
// ======================================

exports.createKamar = async (req, res) => {

  try {

    const {
      nomor_kamar,
      jenis_asrama,
      kapasitas,
    } = req.body;

    await db.query(
      `
      INSERT INTO kamar
      (
        nomor_kamar,
        jenis_asrama,
        kapasitas,
        terisi,
        status
      )
      VALUES (?, ?, ?, 0, 'Tersedia')
      `,
      [
        nomor_kamar,
        jenis_asrama,
        kapasitas,
      ]
    );

    res.status(201).json({
      message:
        "Kamar berhasil ditambahkan",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });

  }

};

// ======================================
// UPDATE KAMAR
// ======================================

exports.updateKamar = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      nomor_kamar,
      jenis_asrama,
      kapasitas,
      status,
    } = req.body;

    await db.query(
      `
      UPDATE kamar
      SET
        nomor_kamar = ?,
        jenis_asrama = ?,
        kapasitas = ?,
        status = ?
      WHERE id = ?
      `,
      [
        nomor_kamar,
        jenis_asrama,
        kapasitas,
        status,
        id,
      ]
    );

    res.status(200).json({
      message:
        "Kamar berhasil diupdate",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });

  }

};

// ======================================
// DELETE KAMAR
// ======================================

exports.deleteKamar = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      `
      DELETE FROM kamar
      WHERE id = ?
      `,
      [id]
    );

    res.status(200).json({
      message:
        "Kamar berhasil dihapus",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });

  }

};