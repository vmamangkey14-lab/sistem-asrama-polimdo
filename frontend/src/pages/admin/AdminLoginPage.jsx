import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";

function AdminLoginPage() {

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("mahasiswaToken");
    localStorage.removeItem("mahasiswaData");

    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      navigate("/dashboard-admin");
    }
  }, [navigate]);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =========================
  // LOGIN ADMIN
  // =========================

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await API.post(
        "/auth/login-admin",
        {
          email,
          password,
        }
      );

      // =========================
      // SIMPAN TOKEN ADMIN
      // =========================

      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      // =========================
      // SIMPAN DATA ADMIN
      // =========================

      localStorage.setItem(
        "adminData",
        JSON.stringify(
          response.data.admin
        )
      );

      // =========================
      // REDIRECT
      // =========================

      navigate("/dashboard-admin");

    } catch (error) {

      alert(

        error.response?.data?.message
        ||

        "Login admin gagal"

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
          max-w-md
          rounded-3xl
          shadow-2xl
          p-10
        "
      >

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

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
            Login Admin
          </h1>

          <p
            className="
              text-slate-500
              mt-3
              leading-relaxed
            "
          >
            ASRAMA POLITEKNIK
            <br />
            NEGERI MANADO
          </p>

        </div>

        {/* ========================= */}
        {/* FORM LOGIN */}
        {/* ========================= */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label
              className="
                block
                mb-2
                font-semibold
                text-slate-700
              "
            >
              Email Admin
            </label>

            <input
              type="email"
              placeholder="Masukkan email admin"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                border
                border-slate-300
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
              required
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label
              className="
                block
                mb-2
                font-semibold
                text-slate-700
              "
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                border
                border-slate-300
                rounded-2xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-700
              hover:bg-blue-800
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
                ? "Loading..."
                : "Login Admin"
            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default AdminLoginPage;