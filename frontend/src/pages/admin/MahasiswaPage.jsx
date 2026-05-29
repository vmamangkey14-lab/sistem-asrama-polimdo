import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Pencil,
  Trash2,
  Download,
  X,
} from "lucide-react";

import jsPDF from "jspdf";

import autoTable
from "jspdf-autotable";

import API from "../../services/api";

import AdminLayout
from "../../layouts/AdminLayout";

function MahasiswaPage() {

  const [mahasiswa,
  setMahasiswa] =
    useState([]);

  const [search,
  setSearch] =
    useState("");

  const [jenisKelaminFilter,
  setJenisKelaminFilter] =
    useState("");

  const [editId,
  setEditId] =
    useState(null);

  const [form,
  setForm] =
    useState({
      nama: "",
      nim: "",
      jurusan: "",
      jenis_kelamin: "",
      email: "",
    });

  // ======================
  // FETCH
  // ======================

  const fetchMahasiswa =
    async () => {

      try {

        const response =
          await API.get(
            "/mahasiswa"
          );

        setMahasiswa(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // ======================
  // LOAD
  // ======================

  useEffect(() => {

    fetchMahasiswa();

  }, []);

  // ======================
  // HANDLE CHANGE
  // ======================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
      e.target.value,
    });

  };

  // ======================
  // EDIT
  // ======================

  const handleEdit = (item) => {

    setEditId(item.id);

    setForm({
      nama: item.nama,
      nim: item.nim,
      jurusan: item.jurusan,
      jenis_kelamin: item.jenis_kelamin,
      email: item.email,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  // ======================
  // UPDATE
  // ======================

  const handleUpdate =
    async (e) => {

      e.preventDefault();

      try {

        await API.put(
          `/mahasiswa/${editId}`,
          form
        );

        alert(
          "Mahasiswa berhasil diupdate"
        );

        setEditId(null);

        setForm({
          nama: "",
          nim: "",
          jurusan: "",
          jenis_kelamin: "",
          email: "",
        });

        fetchMahasiswa();

      } catch (error) {

        console.log(error);

      }

    };

  // ======================
  // DELETE
  // ======================

  const handleDelete =
    async (id) => {

      const confirmDelete =
        confirm(
          "Yakin ingin menghapus mahasiswa?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/mahasiswa/${id}`
        );

        alert(
          "Mahasiswa berhasil dihapus"
        );

        fetchMahasiswa();

      } catch (error) {

        console.log(error);

      }

    };

  // ======================
  // FILTER
  // ======================

  const filteredMahasiswa =
    mahasiswa.filter((item) => {

      const matchSearch =

        item.nama
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        item.nim
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchJenisKelamin =
        jenisKelaminFilter === ""
          ? true
          : item.jenis_kelamin ===
            jenisKelaminFilter;

      return (
        matchSearch &&
        matchJenisKelamin
      );

    });

  // ======================
  // EXPORT PDF
  // ======================

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "LAPORAN DATA MAHASISWA",
      14,
      20
    );

    doc.setFontSize(12);

    doc.text(
      "ASRAMA POLITEKNIK NEGERI MANADO",
      14,
      30
    );

    autoTable(doc, {

      startY: 40,

      head: [[
        "Nama",
        "NIM",
        "Jurusan",
        "Jenis Kelamin",
        "Email",
      ]],

      body:
        filteredMahasiswa.map(
          (item) => [

            item.nama,
            item.nim,
            item.jurusan,
            item.jenis_kelamin,
            item.email,

          ]
        ),

    });

    doc.save(
      "laporan-mahasiswa.pdf"
    );

  };

  return (

    <AdminLayout>

      <div>

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Data Mahasiswa
            </h1>

            <p className="text-gray-500 mt-2">
              Sistem Informasi Asrama
              Politeknik Negeri Manado
            </p>

          </div>

          <button
            onClick={exportPDF}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-4 rounded-2xl font-semibold transition flex items-center gap-3"
          >

            <Download size={20} />

            Export PDF

          </button>

        </div>

        {/* FORM EDIT */}

        {editId && (

          <div className="bg-white rounded-[35px] shadow-xl p-8 mb-10">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold text-gray-800">
                Edit Mahasiswa
              </h2>

              <button
                onClick={() => {

                  setEditId(null);

                  setForm({
                    nama: "",
                    nim: "",
                    jurusan: "",
                    jenis_kelamin: "",
                    email: "",
                  });

                }}
                className="bg-red-100 text-red-600 p-3 rounded-xl"
              >

                <X size={20} />

              </button>

            </div>

            <form
              onSubmit={handleUpdate}
              className="grid md:grid-cols-2 gap-5"
            >

              <input
                type="text"
                name="nama"
                placeholder="Nama"
                value={form.nama}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-2xl"
              />

              <input
                type="text"
                name="nim"
                placeholder="NIM"
                value={form.nim}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-2xl"
              />

              <input
                type="text"
                name="jurusan"
                placeholder="Jurusan"
                value={form.jurusan}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-2xl"
              />

              <select
                name="jenis_kelamin"
                value={form.jenis_kelamin}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-2xl"
              >

                <option value="">
                  Pilih Jenis Kelamin
                </option>

                <option value="Laki-laki">
                  Laki-laki
                </option>

                <option value="Perempuan">
                  Perempuan
                </option>

              </select>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-2xl md:col-span-2"
              />

              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-950 text-white p-4 rounded-2xl font-bold transition"
              >
                Update Mahasiswa
              </button>

            </form>

          </div>

        )}

        {/* SEARCH */}

        <div className="bg-white rounded-[35px] shadow-xl p-6 mb-10">

          <div className="grid lg:grid-cols-2 gap-5">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Cari nama / NIM..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-4 pl-12 rounded-2xl"
              />

            </div>

            <select
              value={jenisKelaminFilter}
              onChange={(e) =>
                setJenisKelaminFilter(
                  e.target.value
                )
              }
              className="border border-gray-300 p-4 rounded-2xl"
            >

              <option value="">
                Semua Jenis Kelamin
              </option>

              <option value="Laki-laki">
                Laki-laki
              </option>

              <option value="Perempuan">
                Perempuan
              </option>

            </select>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-[35px] shadow-xl overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-2xl font-bold text-gray-800">
              List Mahasiswa
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-5 text-left">
                    Nama
                  </th>

                  <th className="p-5 text-left">
                    NIM
                  </th>

                  <th className="p-5 text-left">
                    Jurusan
                  </th>

                  <th className="p-5 text-left">
                    Jenis Kelamin
                  </th>

                  <th className="p-5 text-left">
                    Email
                  </th>

                  <th className="p-5 text-left">
                    Aksi
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredMahasiswa.length > 0 ? (

                  filteredMahasiswa.map(
                    (item) => (

                      <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50 transition"
                      >

                        <td className="p-5 font-semibold">
                          {item.nama}
                        </td>

                        <td className="p-5">
                          {item.nim}
                        </td>

                        <td className="p-5">
                          {item.jurusan}
                        </td>

                        <td className="p-5">

                          <span
                            className={`
                              px-4 py-2 rounded-full text-sm font-semibold

                              ${
                                item.jenis_kelamin ===
                                "Laki-laki"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-pink-100 text-pink-700"
                              }
                            `}
                          >

                            {item.jenis_kelamin}

                          </span>

                        </td>

                        <td className="p-5">
                          {item.email}
                        </td>

                        <td className="p-5">

                          <div className="flex gap-3">

                            <button
                              onClick={() =>
                                handleEdit(item)
                              }
                              className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-xl transition"
                            >

                              <Pencil size={18} />

                            </button>

                            <button
                              onClick={() =>
                                handleDelete(item.id)
                              }
                              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition"
                            >

                              <Trash2 size={18} />

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center p-10 text-gray-500"
                    >

                      Tidak ada data mahasiswa

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

export default MahasiswaPage;