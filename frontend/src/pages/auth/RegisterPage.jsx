import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

function RegisterPage() {

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    const mahasiswaToken = localStorage.getItem("mahasiswaToken");
    if (mahasiswaToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ====================================
  // STATE
  // ====================================

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      nama: "",

      nim: "",

      jurusan: "",

      jenis_kelamin: "",

      no_hp: "",

      email: "",

      password: "",

    });

  // ====================================
  // HANDLE CHANGE
  // ====================================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };

  // ====================================
  // HANDLE REGISTER
  // ====================================

  const handleRegister =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const response =
          await API.post(

            "/auth/register",

            {

              nama:
                form.nama,

              nim:
                form.nim,

              jurusan:
                form.jurusan,

              jenis_kelamin:
                form.jenis_kelamin,

              no_hp:
                form.no_hp,

              email:
                form.email,

              password:
                form.password,

            }

          );

        alert(
          response.data.message
        );

        // PINDAH KE LOGIN

        navigate("/login");

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message
          ||

          "Register gagal"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-blue-950
        via-blue-900
        to-indigo-900
        p-6
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-xl
          rounded-3xl
          shadow-2xl
          p-10
        "
      >

        {/* ======================= */}
        {/* HEADER */}
        {/* ======================= */}

        <div className="text-center mb-8">

          <img
            src="/logo-polimdo.png"
            alt="POLIMDO"
            className="
              w-24
              h-24
              object-contain
              mx-auto
              mb-4
            "
          />

          <h1
            className="
              text-4xl
              font-extrabold
              text-slate-800
            "
          >
            Register Mahasiswa
          </h1>

          <p
            className="
              text-slate-500
              mt-2
            "
          >
            ASRAMA POLITEKNIK
            NEGERI MANADO
          </p>

        </div>

        {/* ======================= */}
        {/* FORM */}
        {/* ======================= */}

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* NAMA */}

          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={form.nama}
            onChange={handleChange}
            className="
              w-full
              border
              border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />

          {/* NIM */}

          <input
            type="text"
            name="nim"
            placeholder="NIM"
            value={form.nim}
            onChange={handleChange}
            className="
              w-full
              border
              border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />

          {/* JURUSAN */}

          <input
            type="text"
            name="jurusan"
            placeholder="Jurusan"
            value={form.jurusan}
            onChange={handleChange}
            className="
              w-full
              border
              border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />

          {/* JENIS KELAMIN */}

          <select
            name="jenis_kelamin"
            value={form.jenis_kelamin}
            onChange={handleChange}
            className="
              w-full
              border
              border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
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

          {/* NO HP */}

          <input
            type="text"
            name="no_hp"
            placeholder="Nomor HP"
            value={form.no_hp}
            onChange={handleChange}
            className="
              w-full
              border
              border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="
              w-full
              border
              border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="
              w-full
              border
              border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-green-600
              hover:bg-green-700
              text-white
              py-4
              rounded-2xl
              font-bold
              text-lg
              transition
              disabled:opacity-50
            "
          >

            {

              loading
              ?

              "Loading..."

              :

              "Register"

            }

          </button>

        </form>

        {/* ======================= */}
        {/* LOGIN */}
        {/* ======================= */}

        <div className="text-center mt-6">

          <p className="text-slate-500">

            Sudah punya akun?

          </p>

          <button
            onClick={() =>
              navigate("/login")
            }
            className="
              text-blue-700
              font-bold
              mt-1
            "
          >
            Login Sekarang
          </button>

        </div>

      </div>

    </div>

  );

}

export default RegisterPage;