import { useEffect, useState } from "react";

import API from "../../services/api";

import AdminLayout
from "../../layouts/AdminLayout";

function MonitoringPage() {

  const [data, setData] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [genderFilter,
  setGenderFilter] =
    useState("");

  const [asramaFilter,
  setAsramaFilter] =
    useState("");

  const [statusFilter,
  setStatusFilter] =
    useState("");

  // ======================
  // FETCH DATA
  // ======================

  const fetchData = async () => {

    try {

      const response = await API.get(
        "/pendaftaran/all"
      );

      setData(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchData();

  }, []);

  // ======================
  // FILTER
  // ======================

  const filteredData =
    data.filter((item) => {

      // SEARCH
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

      // GENDER
      const matchGender =
        genderFilter === ""
          ? true
          : item.gender ===
            genderFilter;

      // ASRAMA
      const matchAsrama =
        asramaFilter === ""
          ? true
          : item.jenis_asrama ===
            asramaFilter;

      // STATUS
      const matchStatus =
        statusFilter === ""
          ? true
          : item.status_pendaftaran ===
            statusFilter;

      return (
        matchSearch
        &&
        matchGender
        &&
        matchAsrama
        &&
        matchStatus
      );

    });

  // ======================
  // STATS
  // ======================

  const totalPenghuni =
    data.filter(
      (item) =>
        item.status_pendaftaran ===
        "Sudah Ditempatkan"
    ).length;

  const totalPutra =
    data.filter(
      (item) =>
        item.jenis_asrama ===
        "Asrama Putra"
    ).length;

  const totalPutri =
    data.filter(
      (item) =>
        item.jenis_asrama ===
        "Asrama Putri"
    ).length;

  return (

    <AdminLayout>

      <div className="space-y-8">

        {/* HEADER */}

       <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Monitoring Asrama
          </h1>

          <p className="text-gray-500 mt-2">
            Sistem Informasi Asrama
            Politeknik Negeri Manado
          </p>

        </div>

        {/* STATISTIK */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-blue-700 text-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-lg font-medium">
              Total Penghuni
            </h2>

            <p className="text-5xl font-bold mt-4">
              {totalPenghuni}
            </p>

          </div>

          <div className="bg-pink-600 text-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-lg font-medium">
              Asrama Putri
            </h2>

            <p className="text-5xl font-bold mt-4">
              {totalPutri}
            </p>

          </div>

          <div className="bg-cyan-700 text-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-lg font-medium">
              Asrama Putra
            </h2>

            <p className="text-5xl font-bold mt-4">
              {totalPutra}
            </p>

          </div>

        </div>

        {/* FILTER */}

        <div className="bg-white rounded-3xl p-6 shadow-sm grid lg:grid-cols-4 gap-4">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Cari nama / NIM..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border rounded-2xl px-4 py-3 outline-none"
          />

          {/* GENDER */}

          <select
            value={genderFilter}
            onChange={(e) =>
              setGenderFilter(
                e.target.value
              )
            }
            className="border rounded-2xl px-4 py-3"
          >

            <option value="">
              Semua Gender
            </option>

            <option value="Laki-laki">
              Laki-laki
            </option>

            <option value="Perempuan">
              Perempuan
            </option>

          </select>

          {/* ASRAMA */}

          <select
            value={asramaFilter}
            onChange={(e) =>
              setAsramaFilter(
                e.target.value
              )
            }
            className="border rounded-2xl px-4 py-3"
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

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border rounded-2xl px-4 py-3"
          >

            <option value="">
              Semua Status
            </option>

            <option value="Menunggu Verifikasi">
              Menunggu Verifikasi
            </option>

            <option value="Terverifikasi">
              Terverifikasi
            </option>

            <option value="Sudah Ditempatkan">
              Sudah Ditempatkan
            </option>

            <option value="Ditolak">
              Ditolak
            </option>

          </select>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-2xl font-bold">
              Data Penghuni Asrama
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="text-left p-4">
                    Nama
                  </th>

                  <th className="text-left p-4">
                    NIM
                  </th>

                  <th className="text-left p-4">
                    Jurusan
                  </th>

                  <th className="text-left p-4">
                    Gender
                  </th>

                  <th className="text-left p-4">
                    Asrama
                  </th>

                  <th className="text-left p-4">
                    Kamar
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredData.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4 font-medium">
                      {item.nama}
                    </td>

                    <td className="p-4">
                      {item.nim}
                    </td>

                    <td className="p-4">
                      {item.jurusan}
                    </td>

                    <td className="p-4">
                      {item.gender}
                    </td>

                    <td className="p-4">
                      {item.jenis_asrama || "-"}
                    </td>

                    <td className="p-4">
                      {item.nomor_kamar || "-"}
                    </td>

                    <td className="p-4">

                      <span
                        className={`
                          px-4 py-2 rounded-full text-sm font-semibold

                          ${
                            item.status_pendaftaran ===
                            "Menunggu Verifikasi"
                            ? "bg-yellow-100 text-yellow-700"
                            : ""
                          }

                          ${
                            item.status_pendaftaran ===
                            "Terverifikasi"
                            ? "bg-blue-100 text-blue-700"
                            : ""
                          }

                          ${
                            item.status_pendaftaran ===
                            "Sudah Ditempatkan"
                            ? "bg-green-100 text-green-700"
                            : ""
                          }

                          ${
                            item.status_pendaftaran ===
                            "Ditolak"
                            ? "bg-red-100 text-red-700"
                            : ""
                          }
                        `}
                      >

                        {item.status_pendaftaran}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default MonitoringPage;