import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  // AMBIL TOKEN ADMIN

  const token =
    localStorage.getItem(
      "adminToken"
    );

  // AMBIL DATA ADMIN

  const admin =
    JSON.parse(
      localStorage.getItem(
        "adminData"
      )
    );

  // JIKA TIDAK ADA TOKEN

  if (!token || !admin) {

    alert(
      "Akses ditolak. Hanya untuk Admin."
    );

    return (
      <Navigate
        to="/admin/login"
      />
    );

  }

  // JIKA ADA

  return children;

}

export default AdminRoute;