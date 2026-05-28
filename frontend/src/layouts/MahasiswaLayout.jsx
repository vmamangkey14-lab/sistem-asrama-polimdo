import { LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";

function MahasiswaLayout({
  children,
}) {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <div className="bg-white shadow-sm px-8 py-5 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <img
            src="/logo-polimdo.png"
            alt="logo"
            className="w-14"
          />

          <div>

            <h1 className="font-bold text-xl text-blue-950">
              ASRAMA POLIMDO
            </h1>

            <p className="text-sm text-gray-500">
              Dashboard Mahasiswa
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 transition"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto p-8">

        {children}

      </div>

    </div>

  );

}

export default MahasiswaLayout;