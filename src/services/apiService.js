import axios from "axios";
import  { useState  } from 'react';
const API_BASE_URL = "https://bck-ua.onrender.com";
//const API_BASE_URL = "http://localhost:8080";

const [token, setToken] = useState(process.isClient ? !localStorage.getItem('token') : false);


if (typeof window !== 'undefined') {
  // El código que usa localStorage va aquí
  // Ejemplo: localStorage.setItem('clave', 'valor');
  if (localStorage.getItem('token')) {
    setToken(localStorage.getItem('token'));
    // Hacer algo con el valor en localStorage
  }
}


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
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

// Función para obtener datos
export const getValidateToken = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response;
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

export const getAssets = async (endpoint, data) => {
  try {
    const response = await api.get(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error al enviar datos:", error);
    throw error;
  }
};

export default api;
