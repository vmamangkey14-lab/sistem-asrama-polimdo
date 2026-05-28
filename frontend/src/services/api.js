import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// otomatis kirim token (mahasiswa atau admin)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("mahasiswaToken");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;