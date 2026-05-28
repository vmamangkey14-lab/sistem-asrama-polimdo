import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../../services/api";

function LoginPage() {

  const navigate =
    useNavigate();

  useEffect(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    const mahasiswaToken = localStorage.getItem("mahasiswaToken");
    if (mahasiswaToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [form,
  setForm] =
    useState({

      email: "",
      password: "",

    });

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
  // LOGIN
  // ======================

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await API.post(
            "/auth/login",
            form
          );

        // SAVE TOKEN
        localStorage.setItem(
          "mahasiswaToken",
          response.data.token
        );

        localStorage.setItem(
          "mahasiswaData",
          JSON.stringify(
            response.data.user
          )
        );

        alert(
          "Login berhasil"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        alert(

          error.response?.data
            ?.message
          ||

          "Login gagal"

        );

      }

    };

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-950
        via-blue-800
        to-blue-600
        flex
        items-center
        justify-center
        px-5
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-[35px]
          p-10
          shadow-2xl
        "
      >

        {/* LOGO */}

        <div className="text-center mb-8">

          <img
            src="/logo-polimdo.png"
            alt="logo"
            className="
              w-24
              mx-auto
              mb-4
            "
          />

          <h1
            className="
              text-4xl
              font-bold
              text-blue-950
            "
          >

            Login Mahasiswa

          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >

            ASRAMA POLITEKNIK
            NEGERI MANADO

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label
              className="
                font-semibold
                text-gray-700
              "
            >

              Email

            </label>

            <input
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={form.email}
              onChange={handleChange}
              required
              className="
                w-full
                mt-2
                border
                border-gray-300
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-blue-700
              "
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label
              className="
                font-semibold
                text-gray-700
              "
            >

              Password

            </label>

            <input
              type="password"
              name="password"
              placeholder="Masukkan password"
              value={form.password}
              onChange={handleChange}
              required
              className="
                w-full
                mt-2
                border
                border-gray-300
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-blue-700
              "
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="
              w-full
              bg-blue-700
              hover:bg-blue-900
              text-white
              py-4
              rounded-2xl
              font-bold
              text-lg
              transition
            "
          >

            Login

          </button>

        </form>

        {/* REGISTER */}

        <div
          className="
            text-center
            mt-8
          "
        >

          <p className="text-gray-500">

            Belum punya akun?

          </p>

          <Link
            to="/register"
            className="
              text-blue-700
              font-bold
              hover:underline
            "
          >

            Daftar Sekarang

          </Link>

        </div>

      </div>

    </div>

  );

}

export default LoginPage;