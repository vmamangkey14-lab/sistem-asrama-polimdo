import { useEffect, useState } from "react";
import {
  Search,
  Users,
  ClipboardList,
  BedDouble,
  CheckCircle,
  Home,
  Check,
  XCircle,
  RefreshCw,
} from "lucide-react";

import API from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

function DashboardAdmin() {
  const [pendaftaran, setPendaftaran] = useState([]);
  const [kamar, setKamar] = useState([]);
  const [stats, setStats] = useState({
    totalMahasiswa: 0,
    totalKamar: 0,
    kamarTersedia: 0,
    sudahDitempatkan: 0,
    totalPendaftaran: 0,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [asramaFilter, setAsramaFilter] = useState("");
  const [selectedPendaftaranId, setSelectedPendaftaranId] = useState(null);

  const fetchPendaftaran = async () => {
    try {
      const response = await API.get("/pendaftaran/all");
      setPendaftaran(response.data);
    } catch (error) {
      console.error("Error fetching registrations:", error.response);
    }
  };

  const fetchKamar = async () => {
    try {
      const response = await API.get("/kamar");
      setKamar(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error.response);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await API.get("/dashboard/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleReopen = async (id) => {
    try {
      await API.put(`/pendaftaran/reopen/${id}`);
      alert("Status pendaftaran dikembalikan ke Menunggu Verifikasi");
      setSelectedPendaftaranId(null);
      loadAllData();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal memproses ulang pendaftaran");
    }
  };

  const handleTolak = async (id) => {
    const confirmTolak = confirm("Yakin ingin menolak pendaftaran ini? Alokasi kamar (jika ada) akan dibatalkan.");
    if (!confirmTolak) return;
    try {
      await API.put(`/pendaftaran/reject/${id}`);
      alert("Pendaftaran ditolak");
      setSelectedPendaftaranId(null);
      loadAllData();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menolak pendaftaran");
    }
  };

  const handleTempatkan = async (pendaftaranId, kamarId) => {
    if (!kamarId) return;
    try {
      const response = await API.put(`/pendaftaran/approve/${pendaftaranId}`, {
        kamar_id: kamarId,
      });
      alert(response.data.message || "Mahasiswa berhasil ditempatkan");
      setSelectedPendaftaranId(null);
      loadAllData();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menempatkan kamar");
    }
  };

  const loadAllData = async () => {
    await Promise.all([fetchPendaftaran(), fetchKamar(), fetchStats()]);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const filteredPendaftaran = pendaftaran.filter((item) => {
    const matchSearch =
      item.nama?.toLowerCase().includes(search.toLowerCase()) ||
      item.nim?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "" ? true : item.status === statusFilter;
    const matchGender = genderFilter === "" ? true : item.gender === genderFilter;
    const matchAsrama = asramaFilter === "" ? true : item.jenis_asrama === asramaFilter;

    return matchSearch && matchStatus && matchGender && matchAsrama;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* ======================
            CARD STATISTIK
        ====================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Card 1: Total Mahasiswa */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex items-center gap-4 relative overflow-hidden group">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition duration-300">
              <Users size={28} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Mahasiswa</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalMahasiswa}</h3>
            </div>
            <div className="absolute right-0 bottom-0 translate-x-2 translate-y-2 opacity-5 text-gray-900 group-hover:scale-125 transition duration-500">
              <Users size={80} />
            </div>
          </div>

          {/* Card 2: Total Pendaftaran */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex items-center gap-4 relative overflow-hidden group">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-110 transition duration-300">
              <ClipboardList size={28} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Pendaftaran</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalPendaftaran}</h3>
            </div>
            <div className="absolute right-0 bottom-0 translate-x-2 translate-y-2 opacity-5 text-gray-900 group-hover:scale-125 transition duration-500">
              <ClipboardList size={80} />
            </div>
          </div>

          {/* Card 3: Total Kamar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex items-center gap-4 relative overflow-hidden group">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:scale-110 transition duration-300">
              <BedDouble size={28} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Kamar</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalKamar}</h3>
            </div>
            <div className="absolute right-0 bottom-0 translate-x-2 translate-y-2 opacity-5 text-gray-900 group-hover:scale-125 transition duration-500">
              <BedDouble size={80} />
            </div>
          </div>

          {/* Card 4: Kamar Tersedia */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex items-center gap-4 relative overflow-hidden group">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition duration-300">
              <CheckCircle size={28} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Kamar Tersedia</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.kamarTersedia}</h3>
            </div>
            <div className="absolute right-0 bottom-0 translate-x-2 translate-y-2 opacity-5 text-gray-900 group-hover:scale-125 transition duration-500">
              <CheckCircle size={80} />
            </div>
          </div>

          {/* Card 5: Sudah Ditempatkan */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex items-center gap-4 relative overflow-hidden group">
            <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl group-hover:scale-110 transition duration-300">
              <Home size={28} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Sudah Ditempatkan</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.sudahDitempatkan}</h3>
            </div>
            <div className="absolute right-0 bottom-0 translate-x-2 translate-y-2 opacity-5 text-gray-900 group-hover:scale-125 transition duration-500">
              <Home size={80} />
            </div>
          </div>
        </div>

        {/* ======================
            SEARCH + FILTER PANEL
        ====================== */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={20} className="absolute left-4 top-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama atau NIM..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 p-3.5 pl-12 rounded-2xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 p-3.5 rounded-2xl text-sm text-gray-700 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
            >
              <option value="">Semua Status</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Terverifikasi">Terverifikasi</option>
              <option value="Sudah Ditempatkan">Sudah Ditempatkan</option>
              <option value="Ditolak">Ditolak</option>
            </select>

            {/* Gender Filter */}
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="border border-gray-200 p-3.5 rounded-2xl text-sm text-gray-700 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
            >
              <option value="">Semua Gender</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>

            {/* Asrama Filter */}
            <select
              value={asramaFilter}
              onChange={(e) => setAsramaFilter(e.target.value)}
              className="border border-gray-200 p-3.5 rounded-2xl text-sm text-gray-700 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
            >
              <option value="">Semua Tipe Asrama</option>
              <option value="Asrama Putra">Asrama Putra</option>
              <option value="Asrama Putri">Asrama Putri</option>
            </select>
          </div>
        </div>

        {/* ======================
            TABLE REGISTRATIONS
        ====================== */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Daftar Pengajuan Kamar Asrama
            </h2>
            <button
              onClick={loadAllData}
              className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <RefreshCw size={14} /> Refresh Data
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider text-center">
                  <th className="p-5 text-left">Nama Mahasiswa</th>
                  <th className="p-5 text-left">NIM</th>
                  <th className="p-5 text-left">Jurusan</th>
                  <th className="p-5 text-left">Gender</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-left">Kamar Terisi</th>
                  <th className="p-5">Tindakan Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredPendaftaran.length > 0 ? (
                  filteredPendaftaran.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                      {/* Nama */}
                      <td className="p-5 font-semibold text-gray-800">{item.nama}</td>
                      {/* NIM */}
                      <td className="p-5 text-gray-500">{item.nim}</td>
                      {/* Jurusan */}
                      <td className="p-5 text-gray-500">{item.jurusan}</td>
                      {/* Gender */}
                      <td className="p-5 text-left">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            item.gender === "Laki-laki"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-pink-50 text-pink-700"
                          }`}
                        >
                          {item.gender}
                        </span>
                      </td>
                      {/* Status */}
                      <td className="p-5 text-left">
                        <span
                          className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold ${
                            item.status === "Menunggu Verifikasi"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : item.status === "Sudah Ditempatkan"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      {/* Kamar */}
                      <td className="p-5 text-left font-semibold">
                        {item.nomor_kamar ? (
                          <div className="flex flex-col">
                            <span className="text-gray-800">{item.nomor_kamar}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{item.jenis_asrama}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">- Belum Ada -</span>
                        )}
                      </td>
                      {/* Tindakan */}
                      <td className="p-5">
                        <div className="flex flex-col gap-3 max-w-[240px] mx-auto">
                          {/* ========================================================
                              WORKFLOW DEPENDENT ACTIONS
                          ======================================================== */}
                          {item.status === "Menunggu Verifikasi" && (
                            <div className="flex flex-col gap-2 w-full">
                              {selectedPendaftaranId === item.id ? (
                                <div className="flex flex-col gap-2">
                                  <select
                                    onChange={(e) => handleTempatkan(item.id, e.target.value)}
                                    className="w-full border border-gray-200 p-2.5 rounded-xl text-xs bg-white text-gray-700 font-medium focus:border-blue-500 outline-none cursor-pointer"
                                  >
                                    <option value="">Pilih & Tempatkan Kamar</option>
                                    {kamar
                                      .filter((k) => {
                                        if (item.gender === "Laki-laki") return k.jenis_asrama === "Asrama Putra";
                                        if (item.gender === "Perempuan") return k.jenis_asrama === "Asrama Putri";
                                        return true;
                                      })
                                      .map((k) => (
                                        <option key={k.id} value={k.id} disabled={k.terisi >= k.kapasitas}>
                                          {k.nomor_kamar} | Terisi: {k.terisi}/{k.kapasitas} {k.terisi >= k.kapasitas ? "- [PENUH]" : ""}
                                        </option>
                                      ))}
                                  </select>
                                  <button
                                    onClick={() => setSelectedPendaftaranId(null)}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-1.5 rounded-xl transition text-xs font-bold flex items-center justify-center cursor-pointer"
                                  >
                                    Batal
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 w-full">
                                  <button
                                    onClick={() => setSelectedPendaftaranId(item.id)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                                  >
                                    <Check size={14} /> Terima
                                  </button>
                                  <button
                                    onClick={() => handleTolak(item.id)}
                                    className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2 px-3 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <XCircle size={14} /> Tolak
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {item.status === "Sudah Ditempatkan" && (
                            <div className="flex flex-col gap-2 w-full">
                              <div className="flex flex-col gap-0.5 text-left">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Pindahkan Kamar:</span>
                                <select
                                  value={item.kamar_id || ""}
                                  onChange={(e) => handleTempatkan(item.id, e.target.value)}
                                  className="w-full border border-blue-200 bg-blue-50/50 p-2.5 rounded-xl text-xs text-blue-800 font-bold focus:border-blue-500 outline-none cursor-pointer"
                                >
                                  {kamar
                                    .filter((k) => {
                                      if (item.gender === "Laki-laki") return k.jenis_asrama === "Asrama Putra";
                                      if (item.gender === "Perempuan") return k.jenis_asrama === "Asrama Putri";
                                      return true;
                                    })
                                    .map((k) => (
                                      <option key={k.id} value={k.id} disabled={k.terisi >= k.kapasitas && k.id !== item.kamar_id}>
                                        {k.nomor_kamar} {k.id === item.kamar_id ? "(Kamar Saat Ini)" : ""} | {k.terisi}/{k.kapasitas} {k.terisi >= k.kapasitas && k.id !== item.kamar_id ? "- [PENUH]" : ""}
                                      </option>
                                    ))}
                                </select>
                              </div>
                              <button
                                onClick={() => handleTolak(item.id)}
                                className="w-full bg-amber-50 hover:bg-amber-100 text-amber-700 py-1.5 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                              >
                                Bebaskan dari Kamar
                              </button>
                            </div>
                          )}

                          {item.status === "Ditolak" && (
                            <button
                              onClick={() => handleReopen(item.id)}
                              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              Proses Ulang
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-12 text-gray-400 font-medium">
                      Tidak ada data pendaftaran yang cocok.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default DashboardAdmin;