import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("mahasiswaToken");
  const user = JSON.parse(localStorage.getItem("mahasiswaData") || "{}");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    // User is not an admin, but is trying to access admin pages
    return <Navigate to="/dashboard" replace />;
  }

  if (!adminOnly && user.role === "admin") {
    // User is admin, but is trying to access student pages
    return <Navigate to="/dashboard-admin" replace />;
  }

  return children;
}

export default ProtectedRoute;