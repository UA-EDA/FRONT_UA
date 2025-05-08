import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
});

// Función para obtener datos
export const getData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

// Función para enviar datos (POST)
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error al enviar datos:", error);
    throw error;
  }
};

export const uploadAsset = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error al enviar datos:", error);
    throw error;
  }
};

export default api;
