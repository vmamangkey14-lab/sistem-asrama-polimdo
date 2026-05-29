import axios from "axios";

// =====================================
// BASE URL BACKEND (SUDAH FIX)
// =====================================
const API = axios.create({
  baseURL: "https://sistem-asrama-polimdo-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

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