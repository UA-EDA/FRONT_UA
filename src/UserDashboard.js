import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import { useContext } from "react";
import LangContext from "./LangContext";
import translations from "./translations";


const UserDashboard = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [seccionActiva, setSeccionActiva] = useState('assets');
  const [subSeccionConfig, setSubSeccionConfig] = useState('perfil');
  const { lang, setLang } = useContext(LangContext);
  const t = translations[lang];

  const cambiarIdioma = (nuevoIdioma) => {
    setLang(nuevoIdioma);
    localStorage.setItem('lang', nuevoIdioma);
    window.location.reload(); // más adelante lo haremos sin recargar si usamos Context
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('nombre');

    if (!token) {
      navigate('/auth/login');
    } else {
      setNombre(userName || 'Usuario');
    }
  }, [navigate]);

  // 🔐 Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    window.location.href = '/';
  };

  const renderConfiguracionContenido = () => {
    switch (subSeccionConfig) {
      case 'perfil':
        return (
          <div className="perfil-section">
            <h3>{t.dashboard.profile_settings}</h3>
            <table className="tabla-perfil">
              <thead>
                <tr>
                  <th>{t.dashboard.field}</th>
                  <th>{t.dashboard.value}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t.dashboard.name}</td>
                  <td>
                    <div className="celda-contenido">
                      {nombre}
                      <button className="editar-btn">
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{t.dashboard.email}</td>
                  <td>
                    <div className="celda-contenido">
                      usuario@example.com
                      <button className="editar-btn">
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{t.dashboard.password}</td>
                  <td>
                    <div className="celda-contenido">
                      ********
                      <button className="editar-btn">
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'idioma':
        return (
          <div className="configuracion-idioma">
            <h3>{t.dashboard.select_language}</h3>
            <div className="botones-idiomas">
              <button onClick={() => cambiarIdioma('es')} className="opcion-btn">
                🇪🇸 Español
              </button>
              <button onClick={() => cambiarIdioma('en')} className="opcion-btn">
                🇬🇧 English
              </button>
            </div>
          </div>
        );
      case 'tema':
        return <div className="configuracion-tema"></div>;

      default:
        return <p>{t.dashboard.select_option}</p>;
    }
  };

  const renderContenido = () => {
    switch (seccionActiva) {
      case 'assets':
        return <div className="mis-assets-section"><h2>{t.dashboard.assets}</h2></div>;
      case 'descargas':
        return <div className="descargas-section"><h2>{t.dashboard.downloads}</h2></div>;
      case 'configuracion':
        return (
          <div className="configuracion-section">
            <h2>{t.dashboard.config}</h2>
            <div className="configuracion-contenedor">
              <div className="configuracion-opciones">
                <button className="opcion-btn" onClick={() => setSubSeccionConfig('perfil')}>{t.dashboard.profile_settings}</button>
                <button className="opcion-btn" onClick={() => setSubSeccionConfig('idioma')}>{t.dashboard.language}</button>
                <button className="opcion-btn" onClick={() => setSubSeccionConfig('tema')}>{t.dashboard.theme}</button>

              </div>
              <div className="configuracion-contenido">
                {renderConfiguracionContenido()}
              </div>
            </div>
          </div>
        );
      default:
        <h3>{t.dashboard.select_section}</h3>
    }
  };

  return (
    <div className="dashboard-container">
      <h1>{t.dashboard.title}, {nombre}</h1>
      <div className="dashboard-contenedor">
        <div className="dashboard-opciones">
          <button className="opcion-btn" onClick={() => setSeccionActiva('assets')}>{t.dashboard.assets}</button>
          <button className="opcion-btn" onClick={() => setSeccionActiva('descargas')}>{t.dashboard.downloads}</button>
          <button className="opcion-btn" onClick={() => setSeccionActiva('configuracion')}>{t.dashboard.config}</button>
          <button className="opcion-btn" onClick={cerrarSesion}>{t.dashboard.logout}</button>
        </div>

        <div className="dashboard-contenido">
          {renderContenido()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
