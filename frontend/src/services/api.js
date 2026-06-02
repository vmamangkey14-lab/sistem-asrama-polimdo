import axios from "axios";

// =====================================
// BASE URL BACKEND
// =====================================
const API_URL = import.meta.env.VITE_API_URL || "https://sistem-asrama-polimdo-production.up.railway.app/api";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Dynamic base URL for uploaded files
export const UPLOADS_BASE_URL = API_URL.endsWith("/api")
  ? API_URL.slice(0, -4) + "/uploads"
  : API_URL + "/uploads";

export const getUploadUrl = (filename) => {
  if (!filename) return null;
  if (filename.startsWith("http://") || filename.startsWith("https://")) return filename;
  return `${UPLOADS_BASE_URL}/${filename}`;
};

// =====================================
// REQUEST INTERCEPTOR (AUTO TOKEN)
// =====================================
API.interceptors.request.use(
  (req) => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("mahasiswaToken");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// =====================================
// RESPONSE INTERCEPTOR (ERROR HANDLING)
// =====================================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);

    // Optional: auto logout kalau token invalid
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("mahasiswaToken");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;