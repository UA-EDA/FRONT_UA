import React, { useState, useEffect } from 'react';
import "./style.css"; // Importa los estilos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
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
    localStorage.removeItem('token');
    setIsAuth(false);
    navigate('/auth/login', { replace: true });
  };

  return (
    <nav>
      <section className="logo">
        <Link to="/" className="logo">Asset-Lab</Link>
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
          style={{ color: 'white' }}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>

      {/* Renderizado condicional de los botones de sesión */}
      {isAuth ? (
        <button onClick={handleLogout} className="logout-btn">
          Cerrar Sesión <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      ) : (
        <Link to="/auth/login" className="login-link">
          Iniciar Sesión <FontAwesomeIcon icon={faUser} />
        </Link>
      )}
    </nav>
  );
};

export default NavBar;

