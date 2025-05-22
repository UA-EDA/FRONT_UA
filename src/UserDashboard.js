import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
<<<<<<< HEAD
import { useContext } from "react";
import LangContext from "./LangContext";
import translations from "./translations";

=======
import useTema from './useTema';
>>>>>>> 0212ade (Modo oscuro, claro, tamaño grande, normal)

const UserDashboard = () => {

  useTema(); 

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


  // Inicializa modoClaro y fuenteGrande leyendo localStorage directamente
  const [modoClaro, setModoClaro] = useState(() => localStorage.getItem('modoClaro') === 'true');
  const [fuenteGrande, setFuenteGrande] = useState(() => localStorage.getItem('fuenteGrande') === 'true');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('nombre');

    if (!token) {
      navigate('/auth/login');
    } else {
      setNombre(userName || 'Usuario');
    }
  }, [navigate]);

  // Aplica las clases CSS cada vez que cambia modoClaro
  useEffect(() => {
    document.body.classList.toggle('modo-claro', modoClaro);
    document.body.classList.toggle('modo-oscuro', !modoClaro);
    localStorage.setItem('modoClaro', modoClaro);
  }, [modoClaro]);

  // Aplica clases y guarda fuenteGrande
  useEffect(() => {
    document.body.classList.toggle('fuente-grande', fuenteGrande);
    localStorage.setItem('fuenteGrande', fuenteGrande);
  }, [fuenteGrande]);

  const cambiarAModoClaro = () => setModoClaro(true);
  const cambiarAModoOscuro = () => setModoClaro(false);
  const activarFuenteGrande = () => setFuenteGrande(true);
  const activarFuenteNormal = () => setFuenteGrande(false);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
<<<<<<< HEAD
    window.location.href = '/';
=======
    navigate('/');
>>>>>>> 0212ade (Modo oscuro, claro, tamaño grande, normal)
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
                      <button className="editar-btn"><FontAwesomeIcon icon={faPen} /></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{t.dashboard.email}</td>
                  <td>
                    <div className="celda-contenido">
                      usuario@example.com
                      <button className="editar-btn"><FontAwesomeIcon icon={faPen} /></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{t.dashboard.password}</td>
                  <td>
                    <div className="celda-contenido">
                      ********
                      <button className="editar-btn"><FontAwesomeIcon icon={faPen} /></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'idioma':
<<<<<<< HEAD
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
=======
        return <div className="configuracion-idioma"><p>(Próximamente)</p></div>;

>>>>>>> 0212ade (Modo oscuro, claro, tamaño grande, normal)
      case 'tema':
        return (
          <div className="configuracion-tema">
            <button className="opcion-btn" onClick={cambiarAModoOscuro}>Modo Oscuro</button>
            <button className="opcion-btn" onClick={cambiarAModoClaro}>Modo Claro</button>
            <button className="opcion-btn" onClick={activarFuenteGrande}>Fuente Grande</button>
            <button className="opcion-btn" onClick={activarFuenteNormal}>Fuente Normal</button>
          </div>
        );

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
