const db = require("../config/db");

// ======================================
// GET ALL KAMAR
// ======================================
exports.getAllKamar = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        nomor_kamar,
        jenis_asrama,
        kapasitas,
        terisi,
        CASE
          WHEN terisi >= kapasitas THEN 'Penuh'
          ELSE 'Tersedia'
        END AS status
      FROM kamar
      ORDER BY id DESC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("GET KAMAR ERROR:", error);

    res.status(500).json({
      message: error.message,
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

    if (
      !nomor_kamar ||
      !jenis_asrama ||
      !kapasitas
    ) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

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
      message: "Kamar berhasil ditambahkan",
    });

  } catch (error) {
    console.error("CREATE KAMAR ERROR:", error);

    res.status(500).json({
      message: error.message,
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
    } = req.body;

    // Update data kamar dan recalculate status
    await db.query(
      `
      UPDATE kamar
      SET
        nomor_kamar = ?,
        jenis_asrama = ?,
        kapasitas = ?,
        status = CASE
          WHEN terisi >= ? THEN 'Penuh'
          ELSE 'Tersedia'
        END
      WHERE id = ?
      `,
      [
        nomor_kamar,
        jenis_asrama,
        kapasitas,
        kapasitas,
        id,
      ]
    );

    res.status(200).json({
      message: "Kamar berhasil diupdate",
    });

  } catch (error) {
    console.error("UPDATE KAMAR ERROR:", error);

    res.status(500).json({
      message: error.message,
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
      message: "Kamar berhasil dihapus",
    });

  } catch (error) {
    console.error("DELETE KAMAR ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};