import { useEffect, useState } from "react";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";

import API from "../../services/api";

import AdminLayout
from "../../layouts/AdminLayout";

function KamarPage() {

  const [kamar, setKamar] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("");

  const [form, setForm] =
    useState({
      nomor_kamar: "",
      jenis_asrama: "",
      kapasitas: 4,
    });

  const [editId, setEditId] =
    useState(null);

  // ======================
  // FETCH KAMAR
  // ======================
  const fetchKamar = async () => {

    try {

      const response =
        await API.get("/kamar");

      setKamar(response.data);

    } catch (error) {

      console.log(error);

    }

  };

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
  // TAMBAH / EDIT
  // ======================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await API.put(
          `/kamar/${editId}`,
          form
        );

        alert("Kamar berhasil diupdate");

      } else {

        await API.post(
          "/kamar",
          form
        );

        alert("Kamar berhasil ditambah");

      }

      setForm({
        nomor_kamar: "",
        jenis_asrama: "",
        kapasitas: 4,
      });

      setEditId(null);

      fetchKamar();

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  // ======================
  // EDIT
  // ======================
  const handleEdit = (item) => {

    setEditId(item.id);

    setForm({
      nomor_kamar:
      item.nomor_kamar,

      jenis_asrama:
      item.jenis_asrama,

      kapasitas:
      item.kapasitas,
    });

  };

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id) => {

    const confirmDelete =
      confirm(
        "Yakin ingin menghapus kamar?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/kamar/${id}`
      );

      alert("Kamar berhasil dihapus");

      fetchKamar();

    } catch (error) {

      console.log(error);

    }

  };

  // ======================
  // FILTER + SEARCH
  // ======================
  const filteredKamar =
    kamar.filter((item) => {

      const matchSearch =
        item.nomor_kamar
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchFilter =
        filter === ""
          ? true
          : item.jenis_asrama ===
            filter;

      return (
        matchSearch &&
        matchFilter
      );

    });

  // ======================
  // LOAD DATA
  // ======================
  useEffect(() => {

    fetchKamar();

  }, []);

  return (

    <AdminLayout>

      <div>

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Data Kamar
          </h1>

          <p className="text-gray-500 mt-2">
            Sistem Informasi Asrama
            Politeknik Negeri Manado
          </p>

        </div>

        {/* FORM */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-4 gap-4"
          >

            <input
              type="text"
              name="nomor_kamar"
              placeholder="Nomor Kamar"
              value={form.nomor_kamar}
              onChange={handleChange}
              className="border p-4 rounded-2xl"
            />

            <select
              name="jenis_asrama"
              value={form.jenis_asrama}
              onChange={handleChange}
              className="border p-4 rounded-2xl"
            >

              <option value="">
                Pilih Asrama
              </option>

              <option value="Asrama Putra">
                Asrama Putra
              </option>

              <option value="Asrama Putri">
                Asrama Putri
              </option>

            </select>

            <input
              type="number"
              name="kapasitas"
              value={form.kapasitas}
              onChange={handleChange}
              className="border p-4 rounded-2xl"
            />

            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-950 text-white rounded-2xl flex items-center justify-center gap-2"
            >

              <Plus size={20} />

              {editId
                ? "Update"
                : "Tambah"}

            </button>

          </form>

        </div>

        {/* FILTER */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

          <div className="grid md:grid-cols-2 gap-4">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Cari nomor kamar..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full border p-4 pl-12 rounded-2xl"
              />

            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl"
            >

              <option value="">
                Semua Asrama
              </option>

              <option value="Asrama Putra">
                Asrama Putra
              </option>

              <option value="Asrama Putri">
                Asrama Putri
              </option>

            </select>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  Nomor Kamar
                </th>

                <th className="p-4 text-left">
                  Jenis Asrama
                </th>

                <th className="p-4 text-left">
                  Kapasitas
                </th>

                <th className="p-4 text-left">
                  Terisi
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Aksi
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredKamar.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {item.nomor_kamar}
                  </td>

                  <td className="p-4">
                    {item.jenis_asrama}
                  </td>

                  <td className="p-4">
                    {item.kapasitas}
                  </td>

                  <td className="p-4">
                    {item.terisi}
                  </td>

                  <td className="p-4">

                    <span
                      className={`
                        px-4 py-2 rounded-full text-sm font-semibold

                        ${
                          item.status ===
                          "Tersedia"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >

                      {item.status}

                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          handleEdit(item)
                        }
                        className="bg-yellow-400 hover:bg-yellow-500 p-3 rounded-xl text-white"
                      >

                        <Pencil size={18} />

                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="bg-red-600 hover:bg-red-700 p-3 rounded-xl text-white"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default KamarPage;