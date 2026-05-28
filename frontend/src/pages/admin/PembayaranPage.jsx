import { useEffect, useState } from "react";
import {
  CreditCard,
  Search,
  Check,
  XCircle,
  ExternalLink,
  RefreshCw,
  X,
} from "lucide-react";

import API from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

function PembayaranPage() {
  const [pembayaran, setPembayaran] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchPembayaran = async () => {
    try {
      const response = await API.get("/pembayaran/all");
      setPembayaran(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handleVerify = async (id, status) => {
    const actionText = status === "Lunas" ? "menyetujui" : "menolak";
    const confirmAction = confirm(`Yakin ingin ${actionText} pembayaran ini?`);
    if (!confirmAction) return;

    try {
      await API.put(`/pembayaran/verifikasi/${id}`, {
        status_pembayaran: status,
      });
      alert(`Pembayaran berhasil diupdate menjadi ${status}`);
      fetchPembayaran();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal memverifikasi pembayaran");
    }
  };

  useEffect(() => {
    fetchPembayaran();
  }, []);

  const filteredPembayaran = pembayaran.filter((item) => {
    const matchSearch =
      item.nama_mahasiswa?.toLowerCase().includes(search.toLowerCase()) ||
      item.nim?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "" ? true : item.status_pembayaran === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* ======================
            HEADER SECTION
        ====================== */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <CreditCard className="text-blue-900" size={36} />
              Verifikasi Pembayaran
            </h1>
            <p className="text-gray-500 mt-2">
              Validasi bukti transfer dan pembayaran kamar asrama mahasiswa
            </p>
          </div>
          <button
            onClick={fetchPembayaran}
            className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition flex items-center gap-2 text-sm font-semibold cursor-pointer self-start"
          >
            <RefreshCw size={16} /> Refresh Data
          </button>
        </div>

        {/* ======================
            SEARCH & FILTER PANEL
        ====================== */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search input */}
            <div className="relative md:col-span-2">
              <Search size={20} className="absolute left-4 top-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama mahasiswa atau NIM..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 p-3.5 pl-12 rounded-2xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
              />
            </div>

            {/* Status dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 p-3.5 rounded-2xl text-sm text-gray-700 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none cursor-pointer"
            >
              <option value="">Semua Status</option>
              <option value="Menunggu">Menunggu Verifikasi</option>
              <option value="Lunas">Lunas</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
        </div>

        {/* ======================
            TABLE PAYMENTS
        ====================== */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">
              Daftar Bukti Pembayaran
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider text-center">
                  <th className="p-5 text-left">Mahasiswa</th>
                  <th className="p-5 text-left">NIM</th>
                  <th className="p-5 text-left">Kamar / Asrama</th>
                  <th className="p-5 text-center">Bukti Bayar</th>
                  <th className="p-5 text-left">Tanggal Upload</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5">Aksi Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredPembayaran.length > 0 ? (
                  filteredPembayaran.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                      {/* Mahasiswa */}
                      <td className="p-5 font-semibold text-gray-800">
                        {item.nama_mahasiswa}
                      </td>

                      {/* NIM */}
                      <td className="p-5 text-gray-500">{item.nim}</td>

                      {/* Kamar / Asrama */}
                      <td className="p-5 text-left">
                        {item.nomor_kamar ? (
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">
                              Kamar {item.nomor_kamar}
                            </span>
                            <span className="text-[11px] text-blue-900 font-bold">
                              Rp {item.jenis_asrama === "Asrama Putra" ? "300.000" : "350.000"} / Bln
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {item.jenis_asrama}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>

                      {/* Bukti Bayar */}
                      <td className="p-5 text-center">
                        {item.bukti_pembayaran === "CASH" ? (
                          <span className="inline-flex items-center px-3 py-1.5 bg-sky-50 border border-sky-100 text-sky-700 rounded-xl text-xs font-extrabold select-none">
                            TUNAI (CASH)
                          </span>
                        ) : item.bukti_pembayaran ? (
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center relative group mx-auto">
                              <img
                                src={`http://localhost:5000/uploads/${item.bukti_pembayaran}`}
                                alt="bukti"
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => setSelectedImage(item.bukti_pembayaran)}
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white cursor-pointer"
                              >
                                <ExternalLink size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>

                      {/* Tanggal Upload */}
                      <td className="p-5 text-gray-500">
                        {new Date(item.tanggal_upload).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>

                      {/* Status */}
                      <td className="p-5 text-left">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${
                            item.status_pembayaran === "Menunggu"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : item.status_pembayaran === "Lunas"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {item.status_pembayaran === "Menunggu"
                            ? "Menunggu Verifikasi"
                            : item.status_pembayaran}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="p-5">
                        <div className="flex items-center justify-center gap-2 max-w-[180px] mx-auto">
                          {item.status_pembayaran === "Menunggu" ? (
                            <>
                              <button
                                onClick={() => handleVerify(item.id, "Lunas")}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                              >
                                <Check size={14} /> Setujui
                              </button>
                              <button
                                onClick={() => handleVerify(item.id, "Ditolak")}
                                className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 py-2 px-3 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <XCircle size={14} /> Tolak
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleVerify(item.id, "Lunas")}
                              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 rounded-xl transition text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              Ubah Status
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-12 text-gray-400 font-medium">
                      Tidak ada data bukti pembayaran.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ======================
          PREMIUM LIGHTBOX MODAL
      ====================== */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full relative flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="font-bold text-gray-800 text-sm">Pratinjau Bukti Pembayaran</span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 bg-slate-50 flex justify-center items-center max-h-[70vh] overflow-y-auto">
              <img
                src={`http://localhost:5000/uploads/${selectedImage}`}
                alt="bukti detail"
                className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-md border border-gray-200"
              />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default PembayaranPage;
