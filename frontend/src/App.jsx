import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// PUBLIC
import LandingPage from "./pages/public/LandingPage";

// AUTH MAHASISWA
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// AUTH ADMIN
import AdminLoginPage from "./pages/admin/AdminLoginPage";

// MAHASISWA
import DashboardMahasiswa from "./pages/mahasiswa/DashboardMahasiswa";

// ADMIN
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import KamarPage from "./pages/admin/KamarPage";
import MahasiswaPage from "./pages/admin/MahasiswaPage";
import MonitoringPage from "./pages/admin/MonitoringPage";
import PembayaranPage from "./pages/admin/PembayaranPage";

// PROTECTED
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            PUBLIC & REDIRECTS
        ========================== */}
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/admin"
          element={<Navigate to="/dashboard-admin" replace />}
        />

        {/* =========================
            AUTH MAHASISWA
        ========================== */}
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* =========================
            AUTH ADMIN
        ========================== */}
        <Route
          path="/admin/login"
          element={<AdminLoginPage />}
        />

        {/* =========================
            DASHBOARD MAHASISWA
        ========================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardMahasiswa />
            </ProtectedRoute>
          }
        />

        {/* =========================
            DASHBOARD ADMIN
        ========================== */}
        <Route
          path="/dashboard-admin"
          element={
            <AdminRoute>
              <DashboardAdmin />
            </AdminRoute>
          }
        />
        
        {/* Map /admin/pendaftaran to DashboardAdmin to display registrations list */}
        <Route
          path="/admin/pendaftaran"
          element={
            <AdminRoute>
              <DashboardAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/kamar"
          element={
            <AdminRoute>
              <KamarPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/mahasiswa"
          element={
            <AdminRoute>
              <MahasiswaPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/monitoring"
          element={
            <AdminRoute>
              <MonitoringPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/pembayaran"
          element={
            <AdminRoute>
              <PembayaranPage />
            </AdminRoute>
          }
        />

        {/* =========================
            FALLBACK
        ========================== */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;