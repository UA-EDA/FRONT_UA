import React, { useState, useEffect, useContext } from 'react';
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { getValidateToken } from "./services/apiService";
import LangContext from "./LangContext";
import translations from "./translations";

const NavBar = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { lang } = useContext(LangContext);
  const t = translations[lang];

  let nombre = '';
  if (typeof window !== 'undefined' && localStorage.getItem('nombre')) {
    nombre = localStorage.getItem('nombre');
  }

  useEffect(() => {
    getValidateToken('/auth/validate')
      .then(x => setIsAuth(x.status === 200))
      .catch(() => setIsAuth(false));
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (

    
    <nav className="nav-bar">
    <section className="logo">
      <a href="/" className="logo">Asset-Lab</a>
    </section>
  
    {/* Menú principal */}
    <div className={`menu ${menuOpen ? 'menu-open' : ''}`}>
      <div className="botones_nav">
        <button className="categorias" onClick={() => { navigate("/categories"); setMenuOpen(false); }}>
          {t.navbar.categories}
        </button>
  
        <button className="mis_assets" onClick={() => { navigate("/asset/upload"); setMenuOpen(false); }}>
          {t.navbar.publish}
        </button>
  
        {/* Usuario móvil al lado de los botones */}
        <div className="login-container mobile-login">
          {isAuth ? (
            <Link to="/dashboard-usuario" className="login-link" onClick={() => setMenuOpen(false)}>
              {nombre} <FontAwesomeIcon icon={faUser} />
            </Link>
          ) : (
            <Link to="/auth/login" className="login-link" onClick={() => setMenuOpen(false)}>
              {t.navbar.login} <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
        </div>
      </div>
  
      <form onSubmit={(e) => { e.preventDefault(); navigate('/'); setMenuOpen(false); }}>
        <input
          name="filtro"
          type="text"
          placeholder={t.navbar.search_placeholder}
          style={{ color: 'white', width: '100%', maxWidth: '400px' }}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  
    {/* Icono usuario en desktop, siempre visible */}
    <div className="login-container desktop-login">
      {isAuth ? (
        <Link to="/dashboard-usuario" className="login-link">
          {nombre} <FontAwesomeIcon icon={faUser} />
        </Link>
      ) : (
        <Link to="/auth/login" className="login-link">
          {t.navbar.login} <FontAwesomeIcon icon={faUser} />
        </Link>
      )}
    </div>
  
    {/* Botón hamburguesa sólo en móvil */}
    <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
      <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} size="lg" />
    </button>
  </nav>
  
  );
};

export default NavBar;
