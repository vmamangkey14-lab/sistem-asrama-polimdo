import { useLocation } from "react-router-dom";

function NavbarAdmin() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard-admin":
        return "Dashboard Admin";
      case "/admin/mahasiswa":
        return "Manajemen Mahasiswa";
      case "/admin/kamar":
        return "Manajemen Kamar";
      case "/admin/pendaftaran":
        return "Pendaftaran Mahasiswa";
      case "/admin/monitoring":
        return "Monitoring Asrama";
      default:
        return "Dashboard Admin";
    }
  };

  const getPageDesc = () => {
    switch (location.pathname) {
      case "/dashboard-admin":
        return "Statistik dan ringkasan sistem asrama";
      case "/admin/mahasiswa":
        return "Kelola data dan akun mahasiswa asrama";
      case "/admin/kamar":
        return "Kelola ketersediaan, kapasitas, dan status kamar";
      case "/admin/pendaftaran":
        return "Verifikasi pendaftaran dan alokasi penempatan kamar";
      case "/admin/monitoring":
        return "Pantau aktivitas dan status hunian kamar asrama";
      default:
        return "Sistem Informasi Asrama Politeknik Negeri Manado";
    }
  };

  return (
    <div className="bg-white h-24 shadow-sm flex items-center justify-between px-8 border-b border-gray-100">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {getPageTitle()}
        </h1>
        <p className="text-gray-400 text-sm mt-0.5">
          {getPageDesc()}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold shadow-md shadow-blue-900/20">
          A
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 leading-tight">
            Kepala Asrama
          </h2>
          <p className="text-xs text-blue-600 font-medium mt-0.5">
            Administrator
          </p>
        </div>
      </div>
    </div>
  );
}

export default NavbarAdmin;