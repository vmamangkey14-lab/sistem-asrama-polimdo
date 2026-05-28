import {
  LayoutDashboard,
  Users,
  BedDouble,
  ClipboardList,
  Activity,
  LogOut,
  CreditCard,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";

function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-72 min-h-screen bg-blue-950 text-white flex flex-col">
      {/* HEADER */}
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center gap-3">
          <img
            src="/logo-polimdo.png"
            alt="logo"
            className="w-14 h-14 object-contain"
          />
          <div>
            <h1 className="font-bold text-lg leading-tight">
              ASRAMA
            </h1>
            <p className="text-sm text-blue-200 leading-tight">
              POLITEKNIK
              <br />
              NEGERI MANADO
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 p-4 space-y-2">
        <Link
          to="/dashboard-admin"
          className={`flex items-center gap-3 p-3 rounded-xl transition ${
            isActive("/dashboard-admin") ? "bg-blue-800 font-semibold" : "hover:bg-blue-900/50"
          }`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/admin/mahasiswa"
          className={`flex items-center gap-3 p-3 rounded-xl transition ${
            isActive("/admin/mahasiswa") ? "bg-blue-800 font-semibold" : "hover:bg-blue-900/50"
          }`}
        >
          <Users size={20} />
          Mahasiswa
        </Link>

        <Link
          to="/admin/kamar"
          className={`flex items-center gap-3 p-3 rounded-xl transition ${
            isActive("/admin/kamar") ? "bg-blue-800 font-semibold" : "hover:bg-blue-900/50"
          }`}
        >
          <BedDouble size={20} />
          Data Kamar
        </Link>

        <Link
          to="/admin/monitoring"
          className={`flex items-center gap-3 p-3 rounded-xl transition ${
            isActive("/admin/monitoring") ? "bg-blue-800 font-semibold" : "hover:bg-blue-900/50"
          }`}
        >
          <Activity size={20} />
          Monitoring
        </Link>

        <Link
          to="/admin/pembayaran"
          className={`flex items-center gap-3 p-3 rounded-xl transition ${
            isActive("/admin/pembayaran") ? "bg-blue-800 font-semibold" : "hover:bg-blue-900/50"
          }`}
        >
          <CreditCard size={20} />
          Pembayaran
        </Link>
      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-blue-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 bg-red-600 hover:bg-red-700 p-3 rounded-xl transition font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SidebarAdmin;