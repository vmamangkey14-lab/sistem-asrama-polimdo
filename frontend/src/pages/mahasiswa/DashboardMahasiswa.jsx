import {
  User,
  GraduationCap,
  Building2,
  BadgeCheck,
  CreditCard,
  UploadCloud,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import jsPDF from "jspdf";
import API from "../../services/api";

import MahasiswaLayout
from "../../layouts/MahasiswaLayout";

function DashboardMahasiswa() {

  const user = JSON.parse(
    localStorage.getItem("mahasiswaData")
  );

  const [status, setStatus] =
    useState(null);

  const [pembayaran, setPembayaran] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("TRANSFER");

  // ======================
  // FETCH STATUS
  // ======================
  const fetchStatus = async () => {

    try {

      const response = await API.get(
        "/pendaftaran/status"
      );

      if (
        response.data.length > 0
      ) {

        setStatus(
          response.data[0]
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  // ======================
  // FETCH PEMBAYARAN STATUS
  // ======================
  const fetchPembayaranStatus = async () => {
    try {
      const response = await API.get("/pembayaran/status");
      setPembayaran(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================
  // UPLOAD BUKTI PEMBAYARAN
  // ======================
  const handleUploadPembayaran = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("bukti_pembayaran", file);

    try {
      const response = await API.post("/pembayaran/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      fetchPembayaranStatus();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal mengupload bukti pembayaran");
    }
  };

  // ======================
  // KONFIRMASI PEMBAYARAN TUNAI (CASH)
  // ======================
  const handleConfirmCash = async () => {
    const amount = status?.jenis_asrama === "Asrama Putra" ? 300000 : 350000;
    const confirmCash = confirm(
      `Yakin ingin melaporkan Pembayaran Tunai (Cash) sebesar Rp ${amount.toLocaleString("id-ID")} kepada Admin?`
    );
    if (!confirmCash) return;

    try {
      const response = await API.post("/pembayaran/upload", {
        metode: "CASH",
      });
      alert(response.data.message);
      fetchPembayaranStatus();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal melaporkan pembayaran tunai");
    }
  };

  // ======================
  // DAFTAR ASRAMA (FALLBACK)
  // ======================
  const handleDaftar =
    async () => {

      try {

        await API.post(
          "/pendaftaran/daftar"
        );

        alert(
          "Berhasil daftar asrama"
        );

        fetchStatus();

      } catch (error) {

        alert(
          error.response?.data
            ?.message || "Gagal mendaftar asrama"
        );

      }

    };

  // ======================
  // UPLOAD FOTO
  // ======================
  const handleUploadFoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("foto", file);

    try {
      const response = await API.post("/mahasiswa/upload-foto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      // update local storage user
      const updatedUser = { ...user, foto_profile: response.data.foto_profile };
      localStorage.setItem("mahasiswaData", JSON.stringify(updatedUser));
      // reload to see changes
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal mengupload foto");
    }
  };

  // ======================
  // UTILITY: LOAD IMAGE AS BASE64
  // ======================
  const loadImageBase64 = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        try {
          const dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        } catch (e) {
          console.error("Canvas toDataURL failed:", e);
          resolve(null);
        }
      };
      img.onerror = () => {
        console.error("Failed to load image for base64 conversion:", url);
        resolve(null);
      };
      img.src = url;
    });
  };

  // ======================
  // CETAK KARTU (PREMIUM jsPDF VECTOR GENERATION)
  // ======================
  const handleCetakKartu = async () => {
    try {
      const logoUrl = "/logo-polimdo.png";
      const photoUrl = user.foto_profile
        ? `http://localhost:5000/uploads/${user.foto_profile}`
        : null;

      // Load images to base64
      const [logoBase64, photoBase64] = await Promise.all([
        loadImageBase64(logoUrl),
        photoUrl ? loadImageBase64(photoUrl) : Promise.resolve(null),
      ]);

      // Initialize jsPDF (CR80 landscape format)
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [85.6, 54],
      });

      // 1. Draw premium background (deep modern slate blue)
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, 85.6, 54, "F");

      // Layered geometric blue/slate accents for premium aesthetic
      doc.setFillColor(30, 41, 59); // slate-800
      doc.triangle(55, 0, 85.6, 0, 85.6, 30, "F");
      
      doc.setFillColor(30, 58, 138); // blue-900
      doc.triangle(65, 0, 85.6, 0, 85.6, 20, "F");

      // Vibrant left vertical stripe
      doc.setFillColor(234, 179, 8); // amber-500 (#eab308)
      doc.rect(0, 0, 2.5, 54, "F");

      // 2. Render Campus Logo
      if (logoBase64) {
        doc.addImage(logoBase64, "PNG", 6, 4, 8, 8);
      } else {
        doc.setFillColor(234, 179, 8);
        doc.circle(10, 8, 4, "F");
      }

      // 3. Render Header Text
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(248, 250, 252); // slate-50
      doc.text("KARTU IDENTITAS ANGGOTA ASRAMA", 16, 7.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.5);
      doc.setTextColor(147, 197, 253); // blue-300
      doc.text("POLITEKNIK NEGERI MANADO", 16, 11);

      // Horizontal Divider
      doc.setDrawColor(51, 65, 85); // slate-700
      doc.setLineWidth(0.25);
      doc.line(6, 14.5, 80, 14.5);

      // 4. Render Student Photo Frame
      doc.setFillColor(15, 23, 42);
      doc.rect(6, 17.5, 19, 24, "F");

      if (photoBase64) {
        doc.addImage(photoBase64, "JPEG", 6, 17.5, 19, 24);
      } else {
        // Draw elegant vector silhouette profile placeholder
        doc.setFillColor(30, 41, 59); // slate-800 placeholder bg
        doc.rect(6, 17.5, 19, 24, "F");

        doc.setFillColor(148, 163, 184); // slate-400 avatar head
        doc.circle(15.5, 25, 3.2, "F");

        doc.ellipse(15.5, 33, 6, 3.2, "F"); // avatar shoulders
      }

      // Gold border frame around the photo
      doc.setDrawColor(234, 179, 8); // amber-500
      doc.setLineWidth(0.35);
      doc.rect(6, 17.5, 19, 24, "D");

      // 5. Render Student Details grid
      const rows = [
        { label: "NAMA", val: user.nama },
        { label: "NIM", val: user.nim },
        { label: "JURUSAN", val: user.jurusan },
        { label: "ASRAMA", val: status?.jenis_asrama || "-" },
        { label: "KAMAR", val: status?.nomor_kamar || "-" },
        { label: "GENDER", val: user.gender || "-" },
      ];

      const startY = 20.5;
      const stepY = 4.0;
      rows.forEach((row, i) => {
        const currentY = startY + i * stepY;
        
        // Draw label
        doc.setFont("helvetica", "bold");
        doc.setFontSize(5.5);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text(row.label, 28, currentY);

        // Draw value
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6.5);
        doc.setTextColor(255, 255, 255); // white
        doc.text(`: ${row.val}`, 42, currentY);
      });

      // 6. Render Footer Section
      doc.setDrawColor(51, 65, 85); // slate-700
      doc.setLineWidth(0.2);
      doc.line(6, 45.5, 80, 45.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(4.5);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text("SISTEM INFORMASI ASRAMA MODERN", 6, 49.5);

      // Resident emerald pill badge
      doc.setFillColor(16, 185, 129); // emerald-500
      doc.roundedRect(68, 46.5, 12, 4, 1, 1, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(4.5);
      doc.setTextColor(255, 255, 255); // white
      doc.text("RESIDENT", 74, 49.2, { align: "center" });

      // Download the generated PDF
      doc.save(`Kartu_Asrama_${user.nim}.pdf`);
    } catch (err) {
      console.error("Gagal cetak kartu PDF:", err);
      alert("Terjadi kesalahan saat mencetak kartu asrama.");
    }
  };

  // ======================
  // LOAD DATA
  // ======================
  useEffect(() => {

    fetchStatus();
    fetchPembayaranStatus();

  }, []);

  return (

    <MahasiswaLayout>

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-black text-gray-800">
          Dashboard Mahasiswa
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Sistem Informasi Asrama
          Politeknik Negeri Manado
        </p>

      </div>

      {/* GRID */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* PROFILE */}

        <div className="bg-gradient-to-br from-blue-950 to-blue-700 text-white rounded-[40px] p-8 shadow-2xl flex flex-col items-center lg:items-start text-center lg:text-left">

          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 mb-4 flex items-center justify-center bg-white/10">
            {user?.foto_profile ? (
              <img
                src={`http://localhost:5000/uploads/${user.foto_profile}`}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={50} className="text-white" />
            )}
          </div>

          <label className="mb-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition select-none">
            Pilih Foto Profil
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadFoto}
            />
          </label>

          <h2 className="text-3xl font-bold mb-3">
            {user?.nama}
          </h2>

          <p className="text-blue-100 mb-8">
            Mahasiswa Polimdo
          </p>

          <div className="space-y-5">

            <div className="flex items-center gap-4">

              <GraduationCap />

              <div>

                <p className="text-blue-200 text-sm">
                  NIM
                </p>

                <h3 className="font-semibold">
                  {user?.nim}
                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Building2 />

              <div>

                <p className="text-blue-200 text-sm">
                  Jurusan
                </p>

                <h3 className="font-semibold">
                  {user?.jurusan}
                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <BadgeCheck />

              <div>

                <p className="text-blue-200 text-sm">
                  Gender
                </p>

                <h3 className="font-semibold">
                  {user?.gender}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* STATUS */}

        <div className="lg:col-span-2 space-y-8">

          {/* STATUS CARD */}

          <div className="bg-white rounded-[40px] shadow-xl p-8">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-3xl font-bold text-gray-800">
                  Status Asrama
                </h2>

                <p className="text-gray-500 mt-2">
                  Informasi pendaftaran
                  asrama mahasiswa
                </p>

              </div>

              <div>

                <span
                  className={`
                    px-6 py-3 rounded-full text-sm font-bold

                    ${
                      status?.status ===
                      "Menunggu Verifikasi"
                        ? "bg-yellow-100 text-yellow-700"
                        : ""
                    }

                    ${
                      status?.status ===
                      "Sudah Ditempatkan"
                        ? "bg-green-100 text-green-700"
                        : ""
                    }

                    ${
                      status?.status ===
                      "Ditolak"
                        ? "bg-red-100 text-red-700"
                        : ""
                    }
                  `}
                >

                  {status?.status || "Belum Daftar"}

                </span>

              </div>

            </div>

            {/* INFO */}

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-gray-100 rounded-3xl p-6">

                <p className="text-gray-500 mb-2">
                  Nomor Kamar
                </p>

                <h3 className="text-3xl font-bold text-gray-800">

                  {status?.nomor_kamar ||
                    "-"}

                </h3>

              </div>

              <div className="bg-gray-100 rounded-3xl p-6">

                <p className="text-gray-500 mb-2">
                  Jenis Asrama
                </p>

                <h3 className="text-3xl font-bold text-gray-800">

                  {status?.jenis_asrama ||
                    "-"}

                </h3>

              </div>

            </div>

            {/* BUTTON */}

            {!status && (
              <button
                onClick={handleDaftar}
                className="mt-8 bg-blue-900 hover:bg-blue-950 text-white px-8 py-4 rounded-[18px] font-bold transition w-full md:w-auto hover:scale-[1.02] active:scale-[0.98] duration-300"
              >
                Daftar Asrama
              </button>
            )}

            {status && status.status === "Sudah Ditempatkan" && (
              <>
                {pembayaran?.status_pembayaran === "Lunas" ? (
                  <button
                    onClick={handleCetakKartu}
                    className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-[18px] font-bold transition w-full md:w-auto flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] duration-300 cursor-pointer"
                  >
                    Cetak Kartu Asrama
                  </button>
                ) : (
                  <div className="mt-8 bg-slate-50 border border-slate-200 text-slate-700 px-6 py-4 rounded-[22px] text-sm font-semibold flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                    <span>Selesaikan pembayaran terlebih dahulu untuk mencetak kartu identitas asrama.</span>
                  </div>
                )}
              </>
            )}

            {status && status.status === "Menunggu Verifikasi" && (
              <div className="mt-8 bg-amber-50/80 backdrop-blur-sm border border-amber-200 text-amber-900 px-6 py-4 rounded-[22px] text-sm font-semibold flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0"></span>
                <span>Pendaftaran sedang diproses. Kartu identitas asrama akan tersedia setelah disetujui admin.</span>
              </div>
            )}

            {status && status.status === "Ditolak" && (
              <div className="mt-8 bg-rose-50/80 backdrop-blur-sm border border-rose-200 text-rose-900 px-6 py-4 rounded-[22px] text-sm font-semibold flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0"></span>
                <span>Pendaftaran Anda ditolak. Silakan hubungi pengelola asrama untuk informasi lebih lanjut.</span>
              </div>
            )}

          </div>

          {/* PEMBAYARAN CARD */}
          {status && status.status === "Sudah Ditempatkan" && (
            <div className="bg-white rounded-[40px] shadow-xl p-8 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Pembayaran Biaya Asrama
                </h2>
                <p className="text-gray-500 mt-2">
                  Selesaikan pembayaran semester ini untuk mengaktifkan kartu identitas asrama Anda.
                </p>
              </div>

              {/* PAYMENT METHOD SELECTOR */}
              {(!pembayaran || pembayaran.status_pembayaran === "Ditolak") && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Pilih Metode Pembayaran:</p>
                  <div className="flex gap-4 p-1 bg-gray-100 rounded-2xl w-full max-w-sm">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("TRANSFER")}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                        paymentMethod === "TRANSFER"
                          ? "bg-white text-blue-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Transfer Bank
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("CASH")}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                        paymentMethod === "CASH"
                          ? "bg-white text-blue-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Tunai (Cash)
                    </button>
                  </div>
                </div>
              )}

              {/* BILLING INFORMATION */}
              <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100 text-blue-900 rounded-xl">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {pembayaran?.bukti_pembayaran === "CASH" || paymentMethod === "CASH"
                        ? "Metode: Pembayaran Tunai (Cash)"
                        : "Metode: Transfer Bank Mandiri"}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {pembayaran?.bukti_pembayaran === "CASH" || paymentMethod === "CASH"
                        ? "Serahkan langsung ke Pengelola / Admin Asrama"
                        : "Gunakan ATM, M-Banking, atau Teller"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  {!(pembayaran?.bukti_pembayaran === "CASH" || paymentMethod === "CASH") && (
                    <>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nomor Rekening</p>
                        <p className="text-base font-extrabold text-blue-900">132-00-1234567-8</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nama Penerima</p>
                        <p className="text-sm font-bold text-gray-800">Asrama Polimdo (a/n Admin)</p>
                      </div>
                    </>
                  )}
                  <div className="col-span-2 pt-2 border-t border-blue-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Jumlah Tagihan</p>
                    <p className="text-xl font-black text-gray-800">
                      Rp {status?.jenis_asrama === "Asrama Putra" ? "300.000" : "350.000"}{" "}
                      <span className="text-xs text-gray-400 font-medium">/ Bulan ({status?.jenis_asrama})</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Pembayaran Alert & Actions */}
              <div className="space-y-4">
                {(!pembayaran || pembayaran.status_pembayaran === "Ditolak") && (
                  <div className="space-y-4">
                    {pembayaran?.status_pembayaran === "Ditolak" && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 rounded-2xl text-xs font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0"></span>
                        <span>Laporan pembayaran sebelumnya DITOLAK admin. Silakan periksa kembali dan laporkan ulang pembayaran yang sah.</span>
                      </div>
                    )}

                    {paymentMethod === "TRANSFER" ? (
                      <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Upload Bukti Transfer</p>
                        <label className="border-2 border-dashed border-gray-200 hover:border-blue-500 rounded-3xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition bg-gray-50/50 hover:bg-blue-50/10">
                          <UploadCloud className="text-gray-400 hover:text-blue-500" size={36} />
                          <span className="text-sm font-semibold text-gray-700">Pilih File Bukti Transfer</span>
                          <span className="text-[10px] text-gray-400">Hanya file JPG, JPEG, PNG</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleUploadPembayaran}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-4">
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                          Silakan serahkan uang tunai sebesar <strong>Rp {status?.jenis_asrama === "Asrama Putra" ? "300.000" : "350.000"}</strong> secara langsung kepada Pengelola Asrama. Setelah menyerahkan dana, klik tombol di bawah untuk mengirimkan konfirmasi.
                        </p>
                        <button
                          type="button"
                          onClick={handleConfirmCash}
                          className="w-full bg-blue-900 hover:bg-blue-950 text-white py-3 rounded-2xl font-bold transition text-xs shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99] duration-300"
                        >
                          Konfirmasi Pembayaran Tunai
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {pembayaran && pembayaran.status_pembayaran === "Menunggu" && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 p-6 rounded-3xl space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0"></span>
                      <h4 className="font-bold text-sm">Menunggu Verifikasi Pembayaran</h4>
                    </div>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      {pembayaran.bukti_pembayaran === "CASH"
                        ? "Laporan pembayaran tunai Anda telah terkirim. Mohon pastikan Anda sudah menyerahkan uang tunai ke Pengelola Asrama. Admin akan menandai pembayaran Anda lunas di sistem setelah dana diterima."
                        : "Bukti transfer Anda telah terkirim dan sedang ditinjau oleh Pengelola / Bendahara Asrama. Proses verifikasi biasanya membutuhkan waktu maksimal 1x24 jam."}
                    </p>
                    {pembayaran.bukti_pembayaran && pembayaran.bukti_pembayaran !== "CASH" && (
                      <div className="pt-2">
                        <p className="text-[9px] text-amber-700 font-bold uppercase tracking-wider mb-1">Pratinjau Bukti:</p>
                        <div className="w-28 h-20 rounded-xl overflow-hidden border border-amber-200 bg-white">
                          <img
                            src={`http://localhost:5000/uploads/${pembayaran.bukti_pembayaran}`}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {pembayaran && pembayaran.status_pembayaran === "Lunas" && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-3xl space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                      <h4 className="font-bold text-sm">Pembayaran Lunas & Terverifikasi</h4>
                    </div>
                    <p className="text-xs text-emerald-900/80 leading-relaxed">
                      Selamat! Pembayaran biaya asrama Anda sebesar <strong>Rp {status?.jenis_asrama === "Asrama Putra" ? "300.000" : "350.000"}</strong> telah terverifikasi lunas. Kartu identitas asrama Anda sekarang sudah aktif dan dapat diunduh di atas.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TIMELINE */}

          <div className="bg-white rounded-[40px] shadow-xl p-8">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Timeline Pendaftaran
            </h2>

            <div className="space-y-8">

              <div className="flex gap-5">

                <div className="w-5 h-5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>

                <div>

                  <h3 className="font-bold text-lg">
                    Akun Dibuat
                  </h3>

                  <p className="text-gray-500">
                    Mahasiswa berhasil
                    membuat akun sistem.
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div
                  className={`
                    w-5 h-5 rounded-full mt-2 flex-shrink-0

                    ${
                      status
                        ? status.status === "Ditolak"
                          ? "bg-rose-500"
                          : "bg-green-500"
                        : "bg-gray-300"
                    }
                  `}
                ></div>

                <div>

                  <h3 className="font-bold text-lg">
                    Pendaftaran Asrama
                  </h3>

                  <p className="text-gray-500">
                    Pengajuan asrama oleh
                    mahasiswa.
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div
                  className={`
                    w-5 h-5 rounded-full mt-2 flex-shrink-0

                    ${
                      status
                        ? status.status === "Sudah Ditempatkan"
                          ? "bg-green-500"
                          : status.status === "Ditolak"
                          ? "bg-rose-500"
                          : "bg-yellow-500"
                        : "bg-gray-300"
                    }
                  `}
                ></div>

                <div>

                  <h3 className="font-bold text-lg">
                    Verifikasi Admin
                  </h3>

                  <p className="text-gray-500">
                    {status?.status === "Ditolak"
                      ? "Pendaftaran ditolak oleh Kepala Asrama."
                      : status?.status === "Menunggu Verifikasi"
                      ? "Menunggu verifikasi pendaftaran oleh Kepala Asrama."
                      : "Pendaftaran diverifikasi oleh Kepala Asrama."}
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div
                  className={`
                    w-5 h-5 rounded-full mt-2 flex-shrink-0

                    ${
                      status
                        ? status.status === "Sudah Ditempatkan"
                          ? "bg-green-500"
                          : status.status === "Ditolak"
                          ? "bg-rose-500"
                          : "bg-gray-300"
                        : "bg-gray-300"
                    }
                  `}
                ></div>

                <div>

                  <h3 className="font-bold text-lg">
                    Penempatan Kamar
                  </h3>

                  <p className="text-gray-500">
                    {status?.status === "Sudah Ditempatkan"
                      ? `Mahasiswa berhasil ditempatkan ke kamar ${status.nomor_kamar} (${status.jenis_asrama}).`
                      : status?.status === "Ditolak"
                      ? "Gagal ditempatkan karena pengajuan ditolak."
                      : "Menunggu penempatan kamar asrama."}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </MahasiswaLayout>

  );

}

export default DashboardMahasiswa;