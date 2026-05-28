import {
  ArrowRight,
  Building2,
  ShieldCheck,
  Users,
  BedDouble,
  Bath,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Flame,
  ShieldAlert,
  Car,
} from "lucide-react";

import { Link } from "react-router-dom";

function LandingPage() {

  return (

    <div className="min-h-screen bg-gray-50">

      {/* ======================
          NAVBAR
      ====================== */}

      <nav className="bg-white shadow-sm fixed w-full z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <img
              src="/logo-polimdo.png"
              alt="logo"
              className="w-14 h-14 object-contain"
            />

            <div>

              <h1 className="font-bold text-xl text-blue-950 leading-tight">
                ASRAMA
              </h1>

              <p className="text-sm text-gray-500 leading-tight">
                POLITEKNIK NEGERI MANADO
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-900 font-medium"
            >
              Login Mahasiswa
            </Link>

            <Link
              to="/admin/login"
              className="bg-blue-900 hover:bg-blue-950 text-white px-5 py-3 rounded-xl transition"
            >
              Login Admin
            </Link>

          </div>

        </div>

      </nav>

      {/* ======================
          HERO SECTION
      ====================== */}

      <section className="pt-40 pb-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-block bg-blue-800 px-5 py-2 rounded-full mb-6">

              <p className="text-sm font-medium">
                Sistem Informasi
              </p>

            </div>

            <h1 className="text-6xl font-black leading-tight mb-6">

              ASRAMA
              <br />

              POLITEKNIK
              <br />

              NEGERI MANADO

            </h1>

            <p className="text-blue-100 text-xl leading-relaxed mb-10">

              Platform digital modern untuk
              pengelolaan asrama mahasiswa
              Politeknik Negeri Manado
              secara realtime, aman,
              dan efisien.

            </p>

            <div className="flex flex-wrap gap-5">

              <Link
                to="/register"
                className="bg-white text-blue-950 px-8 py-4 rounded-2xl font-bold hover:bg-blue-100 transition flex items-center gap-3"
              >

                Daftar Asrama
                <ArrowRight size={20} />

              </Link>

              <Link
                to="/login"
                className="border border-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-950 transition"
              >
                Login Mahasiswa
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-10 shadow-2xl">

              <div className="grid grid-cols-2 gap-6">

                <div className="bg-white/10 rounded-3xl p-6">

                  <Building2
                    size={40}
                    className="mb-4"
                  />

                  <h2 className="text-2xl font-bold mb-2">
                    2 Gedung
                  </h2>

                  <p className="text-blue-100">
                    Asrama Putra & Putri
                  </p>

                </div>

                <div className="bg-white/10 rounded-3xl p-6">

                  <Users
                    size={40}
                    className="mb-4"
                  />

                  <h2 className="text-2xl font-bold mb-2">
                    Mahasiswa
                  </h2>

                  <p className="text-blue-100">
                    Pengelolaan realtime
                  </p>

                </div>

                <div className="bg-white/10 rounded-3xl p-6">

                  <BedDouble
                    size={40}
                    className="mb-4"
                  />

                  <h2 className="text-2xl font-bold mb-2">
                    Kamar Modern
                  </h2>

                  <p className="text-blue-100">
                    Kapasitas terkontrol
                  </p>

                </div>

                <div className="bg-white/10 rounded-3xl p-6">

                  <ShieldCheck
                    size={40}
                    className="mb-4"
                  />

                  <h2 className="text-2xl font-bold mb-2">
                    Sistem Aman
                  </h2>

                  <p className="text-blue-100">
                    JWT Authentication
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ======================
          SECTION GEDUNG
      ====================== */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-black text-gray-800 mb-6">
              Gedung Asrama
            </h2>

            <p className="text-xl text-gray-500">
              Terdiri dari dua gedung utama
              yang nyaman dan modern
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-10">

            {/* PUTRA */}

            <div className="bg-white rounded-[40px] shadow-xl p-10 hover:-translate-y-2 transition duration-300">

              <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center mb-8">

                <Building2
                  size={40}
                  className="text-blue-900"
                />

              </div>

              <h2 className="text-4xl font-bold mb-5 text-blue-950">
                Asrama Putra
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">

                Gedung khusus mahasiswa
                laki-laki dengan fasilitas
                lengkap, keamanan terjamin,
                dan lingkungan nyaman.

              </p>

            </div>

            {/* PUTRI */}

            <div className="bg-white rounded-[40px] shadow-xl p-10 hover:-translate-y-2 transition duration-300">

              <div className="w-20 h-20 rounded-3xl bg-pink-100 flex items-center justify-center mb-8">

                <Building2
                  size={40}
                  className="text-pink-600"
                />

              </div>

              <h2 className="text-4xl font-bold mb-5 text-pink-600">
                Asrama Putri
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">

                Gedung khusus mahasiswa
                perempuan dengan fasilitas
                aman, nyaman, dan mendukung
                aktivitas akademik mahasiswa.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ======================
          SECTION FASILITAS
      ====================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-800 mb-6">
              Fasilitas Asrama
            </h2>
            <p className="text-xl text-gray-500">
              Menyediakan fasilitas modern demi kenyamanan hidup dan aktivitas akademik Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fasilitas 1 - Dapur Umum */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex gap-5 hover:shadow-md transition hover:-translate-y-1 duration-300">
              <div className="p-3 bg-blue-100 text-blue-900 rounded-2xl h-fit flex-shrink-0">
                <Flame size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-blue-950 mb-2">Dapur Umum Komunal</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Fasilitas dapur bersama yang bersih, higienis, dan modern, lengkap dengan peralatan memasak serta area penyimpanan untuk kebutuhan sehari-hari Anda.
                </p>
              </div>
            </div>

            {/* Fasilitas 2 - Kamar Mandi Dalam & Luar */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex gap-5 hover:shadow-md transition hover:-translate-y-1 duration-300">
              <div className="p-3 bg-blue-100 text-blue-900 rounded-2xl h-fit flex-shrink-0">
                <Bath size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-blue-950 mb-2">Kamar Mandi Dalam & Luar</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Pilihan tipe hunian dengan toilet dalam pribadi yang eksklusif, maupun fasilitas kamar mandi luar bersih yang selalu dirawat dan dijaga kebersihannya.
                </p>
              </div>
            </div>

            {/* Fasilitas 3 - Furnitur Kamar Lengkap */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex gap-5 hover:shadow-md transition hover:-translate-y-1 duration-300">
              <div className="p-3 bg-blue-100 text-blue-900 rounded-2xl h-fit flex-shrink-0">
                <BedDouble size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-blue-950 mb-2">Furnitur Kamar Lengkap</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Kamar siap huni yang dilengkapi dengan tempat tidur nyaman, meja belajar personal yang ergonomis, serta lemari pakaian kokoh untuk kenyamanan studi Anda.
                </p>
              </div>
            </div>

            {/* Fasilitas 4 - Keamanan Terjamin */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex gap-5 hover:shadow-md transition hover:-translate-y-1 duration-300">
              <div className="p-3 bg-blue-100 text-blue-900 rounded-2xl h-fit flex-shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-blue-950 mb-2">Keamanan Terjamin 24/7</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lingkungan yang aman terkontrol dengan pos penjagaan petugas keamanan resmi di gerbang utama serta pengawasan lingkungan asrama sepanjang hari.
                </p>
              </div>
            </div>

            {/* Fasilitas 5 - Ruang Belajar */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex gap-5 hover:shadow-md transition hover:-translate-y-1 duration-300">
              <div className="p-3 bg-blue-100 text-blue-900 rounded-2xl h-fit flex-shrink-0">
                <BookOpen size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-blue-950 mb-2">Ruang Belajar Bersama</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Area luas yang didesain kondusif dan tenang untuk belajar mandiri, kerja kelompok, maupun diskusi akademik interaktif dengan rekan asrama.
                </p>
              </div>
            </div>

            {/* Fasilitas 6 - Area Parkir Luas */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex gap-5 hover:shadow-md transition hover:-translate-y-1 duration-300">
              <div className="p-3 bg-blue-100 text-blue-900 rounded-2xl h-fit flex-shrink-0">
                <Car size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-blue-950 mb-2">Area Parkir Luas</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Menyediakan fasilitas area parkir kendaraan roda dua dan roda empat yang sangat luas, aman, tertata rapi, serta terpantau dengan baik demi kenyamanan berkendara Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================
          SECTION PERATURAN
      ====================== */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-800 mb-6">
              Tata Tertib & Peraturan
            </h2>
            <p className="text-xl text-gray-500">
              Tata tertib demi kenyamanan, keselamatan, dan keharmonisan hidup bersama
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 flex gap-5 items-start">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl flex-shrink-0">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Aturan Jam Malam (22:00 WITA)</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Gerbang utama asrama ditutup tepat pada pukul 22:00 WITA setiap hari demi alasan keamanan penertiban penghuni asrama.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 flex gap-5 items-start">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl flex-shrink-0">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Tamu & Pengunjung</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Tamu non-penghuni dilarang keras memasuki kamar mahasiswa tanpa persetujuan tertulis resmi dari Pengelola / Kepala Asrama.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 flex gap-5 items-start">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl flex-shrink-0">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Kebersihan & Kerapian Mandiri</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Wajib merapikan kamar masing-masing setiap hari, membuang sampah pada tempatnya, serta aktif menjaga kebersihan fasilitas komunal.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 flex gap-5 items-start">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl flex-shrink-0">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Larangan Barang Berbahaya</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Dilarang keras membawa atau menyimpan senjata tajam, narkotika/obat-obatan terlarang, minuman keras, maupun rokok di lingkungan asrama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================
          SECTION CONTACT / CALL CENTER
      ====================== */}
      <section className="py-24 bg-gradient-to-br from-blue-950 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-extrabold mb-4 leading-tight">Hubungi Layanan Informasi</h2>
            <p className="text-blue-200 text-base leading-relaxed">
              Memiliki pertanyaan seputar pendaftaran, alur asrama, peraturan, atau pembayaran? Silakan hubungi call center pengelola asrama kami.
            </p>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {/* Contact Card 1 - Call Center Utama */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-3xl flex gap-4 items-center sm:col-span-2">
              <div className="p-4 bg-blue-500/20 text-blue-300 rounded-2xl flex-shrink-0 animate-pulse">
                <Phone size={28} />
              </div>
              <div>
                <h5 className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">Call Center Utama Asrama</h5>
                <p className="text-xl font-extrabold mt-0.5 tracking-wide">+62-822-3903-0989</p>
                <p className="text-[11px] text-blue-200 mt-1">Layanan Informasi Terpadu Asrama Putra & Putri — Kepala Asrama (Denny)</p>
              </div>
            </div>

            {/* Contact Card 2 - Email */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-3xl flex gap-4 items-center">
              <div className="p-3 bg-blue-500/20 text-blue-300 rounded-2xl flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h5 className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">Layanan Kampus</h5>
                <p className="text-sm font-extrabold mt-0.5">www.polimdo.ac.id</p>
                <p className="text-[11px] text-blue-200">Informasi & Bantuan Akademik</p>
              </div>
            </div>

            {/* Contact Card 3 - Lokasi */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-3xl flex gap-4 items-center">
              <div className="p-3 bg-blue-500/20 text-blue-300 rounded-2xl flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h5 className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">Lokasi Asrama</h5>
                <p className="text-xs font-bold mt-0.5">Jl. Raya Politeknik, Kel. Buha, Kec. Mapanget, PO. BOX 1256 – 95252, Manado, Sulawesi Utara, Indonesia.</p>
                <p className="text-[11px] text-blue-200">Kampus Politeknik Negeri Manado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================
          FOOTER
      ====================== */}

      <footer className="bg-blue-950 text-white py-10">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <img
            src="/logo-polimdo.png"
            alt="logo"
            className="w-20 mx-auto mb-5"
          />

          <h2 className="text-2xl font-bold mb-3">
            ASRAMA POLITEKNIK NEGERI MANADO
          </h2>

          <p className="text-blue-200">
            Sistem Informasi Asrama
          </p>

        </div>

      </footer>

    </div>

  );

}

export default LandingPage;