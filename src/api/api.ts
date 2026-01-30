import axios, { AxiosError } from "axios";
import { api_url } from "../utils/constants";

// Axios instance configured with base URL
const api = axios.create({
  baseURL: api_url,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("areaHoodToken");
  if (token) {
    if (config.headers) {
      const headers: any = config.headers as any;
      if (typeof headers.set === "function") {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      config.headers = { Authorization: `Bearer ${token}` } as any;
    }
  }
  return config;
});

// Response interceptor: handle 401/403 by clearing storage and redirecting
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      try {
        localStorage.clear();
      } catch (_) {}
      // Redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
