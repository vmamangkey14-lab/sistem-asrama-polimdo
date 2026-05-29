const db = require("../config/db");

// ======================
// GET ALL MAHASISWA
// ======================

const getAllMahasiswa = async (
  req,
  res
) => {
  try {
    const sql = `
      SELECT
        id,
        nama,
        nim,
        jurusan,
        jenis_kelamin,
        email,
        foto_profile
      FROM mahasiswa
      ORDER BY id DESC
    `;

    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// UPDATE MAHASISWA
// ======================

const updateMahasiswa = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      nama,
      nim,
      jurusan,
      jenis_kelamin,
      email,
    } = req.body;

    const sql = `
      UPDATE mahasiswa
      SET
        nama = ?,
        nim = ?,
        jurusan = ?,
        jenis_kelamin = ?,
        email = ?
      WHERE id = ?
    `;

    await db.query(
      sql,
      [
        nama,
        nim,
        jurusan,
        jenis_kelamin,
        email,
        id,
      ]
    );

    res.json({
      message: "Mahasiswa berhasil diupdate",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// DELETE MAHASISWA
// ======================

const deleteMahasiswa = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // 1. Dapatkan info pendaftaran mahasiswa terlebih dahulu
    const [pendaftaranRows] = await db.query(
      `SELECT * FROM pendaftaran WHERE mahasiswa_id = ?`,
      [id]
    );

    if (pendaftaranRows.length > 0) {
      const pendaftaran = pendaftaranRows[0];
      
      // Jika statusnya 'Sudah Ditempatkan' dan ada kamar_id, kurangi terisi kamar tersebut
      if (pendaftaran.status_pendaftaran === "Sudah Ditempatkan" && pendaftaran.kamar_id) {
        await db.query(
          `UPDATE kamar SET terisi = GREATEST(0, terisi - 1) WHERE id = ?`,
          [pendaftaran.kamar_id]
        );
      }

      // Hapus pendaftaran mahasiswa terlebih dahulu untuk menghindari error foreign key constraint
      await db.query(
        `DELETE FROM pendaftaran WHERE mahasiswa_id = ?`,
        [id]
      );
    }

    // 2. Hapus data mahasiswa
    const sql = `
      DELETE FROM mahasiswa
      WHERE id = ?
    `;

    await db.query(sql, [id]);

    res.json({
      message: "Mahasiswa berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ======================
// UPLOAD FOTO PROFILE
// ======================

const uploadFotoProfile = async (req, res) => {
  try {
    const mahasiswaId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        message: "File tidak ditemukan",
      });
    }

    const fotoPath = req.file.filename;

    const sql = `
      UPDATE mahasiswa
      SET foto_profile = ?
      WHERE id = ?
    `;

    await db.query(
      sql,
      [
        fotoPath,
        mahasiswaId,
      ]
    );

    res.json({
      message: "Foto profile berhasil diupload",
      foto_profile: fotoPath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getAllMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
  uploadFotoProfile,
};