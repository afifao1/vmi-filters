import axios from "axios";

const baseURL = import.meta.env?.VITE_API_BASE_URL || "/api";

const api = axios.create({
  baseURL,
  withCredentials: false,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default api;

export const getProducts = (params?: Record<string, any>) =>
  api.get("/products", { params });
export const getBrands = () => api.get("/brands");
export const getCerts = () => api.get("/certificates");
