const db = require("../config/db");

// ======================================
// MAHASISWA - BUAT PENDAFTARAN
// ======================================
exports.createPendaftaran = async (req, res) => {
  try {
    const mahasiswa_id = req.user.id;

    // CEK ROLE
    if (req.user.role === "admin") {
      return res.status(403).json({
        message: "Admin tidak dapat mendaftar asrama",
      });
    }

    // CEK SUDAH MENDAFTAR
    const [cek] = await db.query(
      `
      SELECT *
      FROM pendaftaran
      WHERE mahasiswa_id = ?
      `,
      [mahasiswa_id]
    );

    if (cek.length > 0) {
      return res.status(400).json({
        message: "Mahasiswa sudah melakukan pendaftaran",
      });
    }

    // INSERT DENGAN STATUS DEFAULT "Menunggu Verifikasi"
    await db.query(
      `
      INSERT INTO pendaftaran
      (
        mahasiswa_id,
        status_pendaftaran
      )
      VALUES (?, ?)
      `,
      [
        mahasiswa_id,
        "Menunggu Verifikasi",
      ]
    );

    res.status(201).json({
      message: "Pendaftaran asrama berhasil diajukan",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================================
// MAHASISWA - STATUS PENDAFTARAN SENDIRI
// ======================================
exports.getStatusMahasiswa = async (req, res) => {
  try {
    const mahasiswa_id = req.user.id;

    const [rows] = await db.query(
      `
      SELECT
        p.id,
        p.mahasiswa_id,
        p.kamar_id,
        p.status_pendaftaran,
        p.status_pendaftaran as status,
        k.nomor_kamar,
        k.jenis_asrama
      FROM pendaftaran p
      LEFT JOIN kamar k
        ON p.kamar_id = k.id
      WHERE p.mahasiswa_id = ?
      `,
      [mahasiswa_id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================================
// ADMIN - LIHAT SEMUA PENDAFTARAN
// ======================================
exports.getAllPendaftaran = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT
        p.id,
        p.mahasiswa_id,
        p.kamar_id,
        p.status_pendaftaran,
        p.status_pendaftaran as status,
        m.nama,
        m.nim,
        m.jurusan,
        m.gender,
        m.email,
        k.nomor_kamar,
        k.jenis_asrama
      FROM pendaftaran p
      JOIN mahasiswa m
        ON p.mahasiswa_id = m.id
      LEFT JOIN kamar k
        ON p.kamar_id = k.id
      ORDER BY p.id DESC
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================================
// ADMIN - TERIMA PENDAFTARAN & TEMPATKAN KAMAR
// ======================================
exports.approvePendaftaran = async (req, res) => {
  try {
    const { id } = req.params;
    const { kamar_id, kamarId } = req.body;
    const finalKamarId = kamar_id || kamarId;

    if (!finalKamarId) {
      return res.status(400).json({
        message: "Kamar ID wajib dipilih",
      });
    }

    // CEK PENDAFTARAN
    const [pendaftaranRows] = await db.query(
      `
      SELECT
        p.*,
        m.gender
      FROM pendaftaran p
      JOIN mahasiswa m
        ON p.mahasiswa_id = m.id
      WHERE p.id = ?
      `,
      [id]
    );

    if (pendaftaranRows.length === 0) {
      return res.status(404).json({
        message: "Pendaftaran tidak ditemukan",
      });
    }

    const pendaftaran = pendaftaranRows[0];

    // CEK KAMAR
    const [kamarRows] = await db.query(
      `
      SELECT *
      FROM kamar
      WHERE id = ?
      `,
      [finalKamarId]
    );

    if (kamarRows.length === 0) {
      return res.status(404).json({
        message: "Kamar tidak ditemukan",
      });
    }

    const kamar = kamarRows[0];

    // CEK KAPASITAS
    if (kamar.terisi >= kamar.kapasitas) {
      return res.status(400).json({
        message: "Kamar sudah penuh",
      });
    }

    // VALIDASI GENDER
    if (
      pendaftaran.gender === "Laki-laki" &&
      kamar.jenis_asrama === "Asrama Putri"
    ) {
      return res.status(400).json({
        message: "Mahasiswa laki-laki tidak bisa masuk asrama putri",
      });
    }

    if (
      pendaftaran.gender === "Perempuan" &&
      kamar.jenis_asrama === "Asrama Putra"
    ) {
      return res.status(400).json({
        message: "Mahasiswa perempuan tidak bisa masuk asrama putra",
      });
    }

    // Jika sebelumnya sudah ditempatkan di kamar lain, kurangi terisi di kamar lama
    if (pendaftaran.status_pendaftaran === "Sudah Ditempatkan" && pendaftaran.kamar_id && pendaftaran.kamar_id !== finalKamarId) {
      await db.query(
        `
        UPDATE kamar
        SET terisi = GREATEST(0, terisi - 1)
        WHERE id = ?
        `,
        [pendaftaran.kamar_id]
      );
    }

    // UPDATE PENDAFTARAN
    await db.query(
      `
      UPDATE pendaftaran
      SET
        kamar_id = ?,
        status_pendaftaran = ?
      WHERE id = ?
      `,
      [
        finalKamarId,
        "Sudah Ditempatkan",
        id,
      ]
    );

    // UPDATE KAMAR BARU (jika sebelumnya belum di kamar ini)
    if (pendaftaran.kamar_id !== finalKamarId) {
      await db.query(
        `
        UPDATE kamar
        SET terisi = terisi + 1
        WHERE id = ?
        `,
        [finalKamarId]
      );
    }

    res.status(200).json({
      message: "Mahasiswa berhasil ditempatkan di kamar",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================================
// ADMIN - TOLAK PENDAFTARAN
// ======================================
exports.rejectPendaftaran = async (req, res) => {
  try {
    const { id } = req.params;

    // CEK PENDAFTARAN
    const [pendaftaranRows] = await db.query(
      `
      SELECT *
      FROM pendaftaran
      WHERE id = ?
      `,
      [id]
    );

    if (pendaftaranRows.length === 0) {
      return res.status(404).json({
        message: "Pendaftaran tidak ditemukan",
      });
    }

    const pendaftaran = pendaftaranRows[0];

    // Jika sebelumnya sudah ditempatkan kamar, bebaskan kamarnya!
    if (pendaftaran.status_pendaftaran === "Sudah Ditempatkan" && pendaftaran.kamar_id) {
      await db.query(
        `
        UPDATE kamar
        SET terisi = GREATEST(0, terisi - 1)
        WHERE id = ?
        `,
        [pendaftaran.kamar_id]
      );
    }

    // UPDATE PENDAFTARAN
    await db.query(
      `
      UPDATE pendaftaran
      SET
        kamar_id = NULL,
        status_pendaftaran = ?
      WHERE id = ?
      `,
      [
        "Ditolak",
        id,
      ]
    );

    res.status(200).json({
      message: "Pendaftaran berhasil ditolak",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================================
// ADMIN - PROSES ULANG PENDAFTARAN
// ======================================
exports.reopenPendaftaran = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `
      UPDATE pendaftaran
      SET
        kamar_id = NULL,
        status_pendaftaran = ?
      WHERE id = ?
      `,
      [
        "Menunggu Verifikasi",
        id,
      ]
    );

    res.status(200).json({
      message: "Status pendaftaran dikembalikan ke Menunggu Verifikasi",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};