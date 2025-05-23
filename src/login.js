import React, { useState } from 'react';
import { postData } from './services/apiService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import LangContext from "./LangContext";
import translations from "./translations";
import useTema from './useTema';

const Login = () => {
  useTema();
  const navigate = useNavigate();

  const { lang } = useContext(LangContext);
  const t = translations[lang];

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar la recarga de la página
    setLoading(true);


    console.log('Enviando datos:', formData); // Verifica los datos antes de enviarlos

    try {
      const response = await postData('/auth/login', formData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token);
        localStorage.setItem('nombre', response.nombre);
      }

      navigate('/');
          setTimeout(() => {
      window.location.reload();
    }, 100); // espera mínima para que React Router procese la navegación

    } catch (error) {
      console.log(error);

      Swal.fire({
        title: '¡Alerta!',
        text: error.response.data ? error.response.data.error : 'No se ha podido hacer login',
        icon: 'error', // Tipo de alerta (success, error, info, warning)
        confirmButtonText: 'Aceptar', // Texto del botón
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center vh-100" >

      <div className="container p-4" style={{ backgroundColor: "#2a2a2a", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "350px" }}>
        <h2 className="text-center text-white fw-bold mb-3">{t.login.title}</h2>

        <div className="mb-2">
          <label className="form-label text-white">{t.login.email}</label>
          <input
            type="email"
            className="form-control text-black border-0"
            placeholder={t.login.email_placeholder}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label text-white">{t.login.password}</label>
          <input
            type="password"
            className="form-control text-black border-0"
            placeholder={t.login.password_placeholder}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>


        <button type="submit" disabled={loading} className="btn btn-primary w-100">
          {loading ? t.login.loading : t.login.submit}
        </button>

        <div className="text-center mt-3">
          <button onClick={() => navigate("/auth/register")} className="text-primary text-decoration-none btn btn-light">
            {t.login.no_account}
          </button>
        </div>

        <div className="text-center mt-3">
          <a href="/" className="text-primary text-decoration-none">
            {t.login.guest_access}
          </a>
        </div>
      </div>

    </form>
  );
};

export default Login;
