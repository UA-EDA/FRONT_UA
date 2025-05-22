import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [seccionActiva, setSeccionActiva] = useState('assets');
  const [subSeccionConfig, setSubSeccionConfig] = useState('perfil');

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
            <h3>Ajustes de perfil</h3>
            <table className="tabla-perfil">
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nombre</td>
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
                  <td>Email</td>
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
                  <td>Contraseña</td>
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
        return <div className="configuracion-idioma"></div>;

      case 'tema':
        return <div className="configuracion-tema"></div>;

      default:
        return <p>Selecciona una opción de configuración.</p>;
    }
  };

  const renderContenido = () => {
    switch (seccionActiva) {
      case 'assets':
        return <div className="mis-assets-section"><h2>Mis Assets</h2></div>;
      case 'descargas':
        return <div className="descargas-section"><h2>Descargas</h2></div>;
      case 'configuracion':
        return (
          <div className="configuracion-section">
            <h2>Configuración</h2>
            <div className="configuracion-contenedor">
              <div className="configuracion-opciones">
                <button className="opcion-btn" onClick={() => setSubSeccionConfig('perfil')}>Ajustes de perfil</button>
                <button className="opcion-btn" onClick={() => setSubSeccionConfig('idioma')}>Idioma</button>
                <button className="opcion-btn" onClick={() => setSubSeccionConfig('tema')}>Tema</button>
              </div>
              <div className="configuracion-contenido">
                {renderConfiguracionContenido()}
              </div>
            </div>
          </div>
        );
      default:
        return <p>Selecciona una sección.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Bienvenido, {nombre}</h1>
      <div className="dashboard-contenedor">
        <div className="dashboard-opciones">
          <button className="opcion-btn" onClick={() => setSeccionActiva('assets')}>Mis Assets</button>
          <button className="opcion-btn" onClick={() => setSeccionActiva('descargas')}>Descargas</button>
          <button className="opcion-btn" onClick={() => setSeccionActiva('configuracion')}>Configuración</button>
          <button className="opcion-btn" onClick={cerrarSesion}>Cerrar Sesión</button>
        </div>
        <div className="dashboard-contenido">
          {renderContenido()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
