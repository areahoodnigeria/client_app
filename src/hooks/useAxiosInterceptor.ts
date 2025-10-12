import { useEffect } from "react";
import api from "../api/api";

// Optional hook to ensure interceptor stays active; can be used in layouts/pages
export default function useAxiosInterceptor() {
  useEffect(() => {
    const reqId = api.interceptors.request.use((config) => {
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

    const resId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          try {
            localStorage.clear();
          } catch (_) {}
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqId);
      api.interceptors.response.eject(resId);
    };
  }, []);
}