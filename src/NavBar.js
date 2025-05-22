import React, { useState, useEffect } from 'react';
import "./style.css"; // Importa los estilos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const nombre = sessionStorage.getItem('nombre');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setIsAuth(false);
      return;
    }

    fetch('/validate', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        setIsAuth(res.status === 200);
      })
      .catch(() => setIsAuth(false));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nombre');
    setIsAuth(false);
    navigate('/auth/login', { replace: true });
  };

  return (
    <nav class="nav-bar">
      <section className="logo">
        <a href="/" className="logo">Asset-Lab</a>
      </section>

      <div className="botones_nav">
        <button className="categorias" onClick={() => navigate("/categories")}>
          Categorías
        </button>
        <button className="mis_assets" onClick={() => navigate("/asset/upload")}>
          Publicar
        </button>
      </div>

      <form>
        <input
          name="filtro"
          type="text"
          placeholder="Buscar..."
          style={{
            color: 'white',
            width: '400px'      // aquí defines el ancho
          }}
        />
        <button type="submit" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>

      {/* Renderizado condicional de los botones de sesión */}
      {isAuth ? (
        <Link to="/auth/login" className="login-link" onClick={handleLogout}>
          Cerrar Sessión ({nombre}) <FontAwesomeIcon icon={faSignOutAlt} />
        </Link>
      ) : (
        <Link to="/auth/login" className="login-link">
          Iniciar Sesión <FontAwesomeIcon icon={faUser} />
        </Link>
      )}

    </nav>
  );
};

export default NavBar;

