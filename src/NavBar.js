import React from "react";
import "./style.css"; // Importa los estilos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <section className="logo"> Asset-Lab </section>

      <div className="botones_nav">
        <button className="categorias" onClick={() => navigate("/categories")}>Categorías</button>
        <button className="mis_assets"> Mis assets</button>
      </div>

      <form >
        <input name="filtro" type="text" placeholder="Buscar..." />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>

      <a href="/auth/login">
        Iniciar Sesión <FontAwesomeIcon icon={faUser} />
      </a>
    </nav>
  );
};

export default NavBar;
