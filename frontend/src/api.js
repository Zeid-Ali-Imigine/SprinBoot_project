import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const apiServices = {
    hello: () => api.get("/api/hello"),

    Utilisateures: {
      getAll: () => api.get("/api/utilisateurs"),
      getById: (id) => api.get(`/api/utilisateurs/${id}`),
      create: (data) => api.post("/api/utilisateurs", data),
      update: (id, data) => api.put(`/api/utilisateurs/${id}`, data),
      delete: (id) => api.delete(`/api/utilisateurs/${id}`),
    },

    produits: {
      getAll: () => api.get("/api/produits"),
      getById: (id) => api.get(`/api/produits/${id}`),
      create: (data) => api.post("/api/produits", data),
      update: (id, data) => api.put(`/api/produits/${id}`, data),
      delete: (id) => api.delete(`/api/produits/${id}`),
    },

    categories: {
      getAll: () => api.get("/api/categories"),
      getById: (id) => api.get(`/api/categories/${id}`),
      create: (data) => api.post("/api/categories", data),
      update: (id, data) => api.put(`/api/categories/${id}`, data),
      delete: (id) => api.delete(`/api/categories/${id}`),
    },

    commandes: {
      getAll: () => api.get("/api/commandes"),
      getById: (id) => api.get(`/api/commandes/${id}`),
      create: (data) => api.post("/api/commandes", data),
      update: (id, data) => api.put(`/api/commandes/${id}`, data),
      delete: (id) => api.delete(`/api/commandes/${id}`),
    },

    articlesCommande: {
      getAll: () => api.get("/api/articles-commande"),
      getById: (id) => api.get(`/api/articles-commande/${id}`),
      create: (data) => api.post("/api/articles-commande", data),
      update: (id, data) => api.put(`/api/articles-commande/${id}`, data),
      delete: (id) => api.delete(`/api/articles-commande/${id}`),
    },
 
};

export { api as default, apiServices };
