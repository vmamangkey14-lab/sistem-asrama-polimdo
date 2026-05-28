const db = require("../config/db");

const getDashboardStats = async (
  req,
  res
) => {

  try {

    // total mahasiswa
    const [mahasiswa] =
      await db
        .query(
          "SELECT COUNT(*) as total FROM mahasiswa"
        );

    // total kamar
    const [kamar] =
      await db
        .query(
          "SELECT COUNT(*) as total FROM kamar"
        );

    // kamar tersedia
    const [tersedia] =
      await db
        .query(`
          SELECT COUNT(*) as total
          FROM kamar
          WHERE status = 'Tersedia'
        `);

    // sudah ditempatkan
    const [ditempatkan] =
      await db
        .query(`
          SELECT COUNT(*) as total
          FROM pendaftaran
          WHERE status_pendaftaran =
          'Sudah Ditempatkan'
        `);

    // total pendaftaran
    const [pendaftaran] =
      await db
        .query(`
          SELECT COUNT(*) as total
          FROM pendaftaran
        `);

    res.json({

      totalMahasiswa:
        mahasiswa[0].total,

      totalKamar:
        kamar[0].total,

      kamarTersedia:
        tersedia[0].total,

      sudahDitempatkan:
        ditempatkan[0].total,

      totalPendaftaran:
        pendaftaran[0].total,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};

module.exports = {
  getDashboardStats,
};