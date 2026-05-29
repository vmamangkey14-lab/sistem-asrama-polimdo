const db = require("../config/db");

// ======================================
// MAHASISWA - UPLOAD BUKTI PEMBAYARAN
// ======================================
exports.uploadPembayaran = async (req, res) => {
  try {
    const mahasiswaId = req.user.id;
    const { metode } = req.body;

    let filename;
    if (metode === "CASH") {
      filename = "CASH";
    } else {
      if (!req.file) {
        return res.status(400).json({
          message: "File bukti pembayaran tidak ditemukan",
        });
      }
      filename = req.file.filename;
    }

    // 1. Cek apakah mahasiswa sudah memiliki pendaftaran yang disetujui / ditempatkan
    const [pendaftaranRows] = await db.query(
      `
      SELECT id 
      FROM pendaftaran 
      WHERE mahasiswa_id = ? AND status_pendaftaran = 'Sudah Ditempatkan'
      `,
      [mahasiswaId]
    );

    if (pendaftaranRows.length === 0) {
      return res.status(400).json({
        message: "Anda belum memiliki penempatan kamar aktif untuk melakukan pembayaran",
      });
    }

    const pendaftaranId = pendaftaranRows[0].id;

    // 2. Cek apakah sudah pernah upload pembayaran untuk pendaftaran ini
    const [pembayaranRows] = await db.query(
      `
      SELECT id FROM pembayaran WHERE pendaftaran_id = ?
      `,
      [pendaftaranId]
    );

    if (pembayaranRows.length > 0) {
      // Update data yang ada dan ubah status kembali ke 'Menunggu'
      await db.query(
        `
        UPDATE pembayaran
        SET 
          bukti_pembayaran = ?,
          status_pembayaran = 'Menunggu',
          tanggal_upload = CURRENT_TIMESTAMP
        WHERE pendaftaran_id = ?
        `,
        [filename, pendaftaranId]
      );
    } else {
      // Buat data pembayaran baru
      await db.query(
        `
        INSERT INTO pembayaran (pendaftaran_id, bukti_pembayaran, status_pembayaran)
        VALUES (?, ?, 'Menunggu')
        `,
        [pendaftaranId, filename]
      );
    }

    res.status(200).json({
      message: "Bukti pembayaran berhasil diupload dan menunggu verifikasi",
      bukti_pembayaran: filename,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================================
// MAHASISWA - CEK STATUS PEMBAYARAN SENDIRI
// ======================================
exports.getPembayaranStatus = async (req, res) => {
  try {
    const mahasiswaId = req.user.id;

    const [rows] = await db.query(
      `
      SELECT p.*
      FROM pembayaran p
      JOIN pendaftaran pf ON p.pendaftaran_id = pf.id
      WHERE pf.mahasiswa_id = ?
      `,
      [mahasiswaId]
    );

    if (rows.length === 0) {
      return res.status(200).json(null);
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================================
// ADMIN - LIHAT SEMUA DATA PEMBAYARAN
// ======================================
exports.getAllPembayaran = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT
        p.id,
        p.pendaftaran_id,
        p.bukti_pembayaran,
        p.status_pembayaran,
        p.tanggal_upload,
        m.nama as nama_mahasiswa,
        m.nim,
        m.jurusan,
        m.jenis_kelamin,
        k.nomor_kamar,
        k.jenis_asrama
      FROM pembayaran p
      JOIN pendaftaran pf ON p.pendaftaran_id = pf.id
      JOIN mahasiswa m ON pf.mahasiswa_id = m.id
      LEFT JOIN kamar k ON pf.kamar_id = k.id
      ORDER BY p.id DESC
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================================
// ADMIN - VERIFIKASI PEMBAYARAN (SETUJUI / TOLAK)
// ======================================
exports.verifyPembayaran = async (req, res) => {
  try {
    const { id } = req.params;
    const { status_pembayaran } = req.body;

    if (!["Lunas", "Ditolak"].includes(status_pembayaran)) {
      return res.status(400).json({
        message: "Status pembayaran tidak valid (harus Lunas atau Ditolak)",
      });
    }

    const [rows] = await db.query(
      `
      SELECT id FROM pembayaran WHERE id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Data pembayaran tidak ditemukan",
      });
    }

    await db.query(
      `
      UPDATE pembayaran
      SET status_pembayaran = ?
      WHERE id = ?
      `,
      [status_pembayaran, id]
    );

    res.status(200).json({
      message: `Status pembayaran berhasil diupdate menjadi ${status_pembayaran}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
