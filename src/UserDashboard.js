import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import { useContext } from "react";
import LangContext from "./LangContext";
import translations from "./translations";
import { postData, getData } from './services/apiService';
import Swal from 'sweetalert2';
import languages from './languages'; // asegúrate de tener la ruta correcta

import useTema from './useTema';

const UserDashboard = () => {

  useTema();

  const navigate = useNavigate();
  const [misAssets, setMisAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nombreEditado, setNombreEditado] = useState('');
  const [emailEditado, setEmailEditado] = useState('');
  const [passEditado, setPassEditado] = useState('');

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
    async function fetchUserInfo() {
      try {
        const data = await getData('auth/me');
        setNombreEditado(data.resultado.nombre_completo || '');
        setEmailEditado(data.resultado.email || '');
        setPassEditado(data.resultado.password || '');
      } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
      }
    }
    fetchUserInfo();

    console.log('Fetching misAssets...');
    getData('/asset/misAssets')
      .then(response => {
        console.log('Received assets:', response);
        setMisAssets(response.resultado || []);
      })
      .catch(err => {
        console.error('Error fetching assets:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al recuperar tus assets',
          text: err.message || 'No se han podido obtener los datos.'
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const changeName = async (newName) => {
    try {
      await postData('/auth/changeName', { newName });
      Swal.fire('Nombre actualizado', '', 'success');
    } catch (error) {
      Swal.fire('Error', error.message || 'No se pudo actualizar el nombre', 'error');
    }
  }
  const changeEmail = async (newEmail) => {
    try {
      await postData('/auth/changeEmail', { newEmail });
      Swal.fire('Email actualizado', '', 'success');
    } catch (error) {
      Swal.fire('Error', error.message || 'No se pudo actualizar el email', 'error');
    }
  };

  const changePass = async (newPass) => {
    try {
      await postData('/auth/changePass', { newPass });
      Swal.fire('Contraseña actualizada', '', 'success');
    } catch (error) {
      Swal.fire('Error', error.message || 'No se pudo actualizar la contraseña', 'error');
    }
  };


  const handleEliminarAsset = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este asset?')) return;
    try {
      await postData('/asset/borrar-asset', { id });
      setMisAssets(misAssets.filter(asset => asset._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Asset eliminado',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error eliminando asset',
        text: error.message || 'No se pudo eliminar el asset'
      });
    }
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
      setNombreEditado(userName || 'Usuario');
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
    window.location.href = '/';
    navigate('/');
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
                      <input
                        type="text"
                        value={nombreEditado}
                        onChange={(e) => setNombreEditado(e.target.value)}
                        style={{ width: '80%' }}
                      />
                      <button className="editar-btn" onClick={() => changeName(nombreEditado)}>
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>{t.dashboard.email}</td>
                  <td>
                    <div className="celda-contenido">
                      <input
                        type="email"
                        value={emailEditado}
                        onChange={(e) => setEmailEditado(e.target.value)}
                        style={{ width: '80%' }}
                      />
                      <button className="editar-btn" onClick={() => changeEmail(emailEditado)}>
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>{t.dashboard.password}</td>
                  <td>
                    <div className="celda-contenido">
                      <input
                        type="password"
                        value={passEditado}
                        onChange={(e) => setPassEditado(e.target.value)}
                        style={{ width: '80%' }}
                      />
                      <button className="editar-btn" onClick={() => changePass(passEditado)}>
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
              {languages.map(langItem => (
                <button
                  key={langItem.code}
                  onClick={() => cambiarIdioma(langItem.code)}
                  className={`opcion-btn ${lang === langItem.code ? 'active' : ''}`}
                >
                  {langItem.flag} {langItem.label}
                </button>
              ))}
            </div>
          </div>
        );
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
        return (
          <div className="mis-assets-section">
            <h2>{t.dashboard.assets}</h2>
            {misAssets.length === 0 ? (
              <p>No tienes assets.</p>
            ) : (
              <ul style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
                {misAssets.map((asset) => (
                  <li
                    key={asset._id}
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      cursor: 'default',
                    }}
                  >
                    <div
                      onClick={() => navigate(`/asset-view?id=${asset._id}`)}
                      style={{ cursor: 'pointer', width: '100%' }}
                      role="link"
                      tabIndex={0}
                      onKeyPress={(e) => { if (e.key === 'Enter') navigate(`/asset-view?${asset._id}`) }}
                    >
                      <img
                        src={asset.portada}
                        alt={`Portada de ${asset.nombre}`}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          marginBottom: '10px',
                        }}
                      />
                      <h3 style={{ margin: '0 0 5px 0' }}>{asset.nombre}</h3>
                    </div>
                    <p style={{ margin: '0 0 10px 0', color: '#666' }}>{asset.likes || 0} likes</p>
                    <button
                      className="opcion-btn"
                      onClick={() => handleEliminarAsset(asset._id)}
                      style={{ alignSelf: 'stretch' }}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

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
      <h1>{t.dashboard.title}, {nombreEditado}</h1>
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