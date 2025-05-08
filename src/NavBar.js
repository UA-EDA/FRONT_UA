import React from "react";
import "./style.css"; // Importa los estilos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons"; 

const NavBar = () => {
  return (
    <nav>
      <section className="logo"> Asset-Lab </section>

      <div className="botones_nav">
        <button className="categorias"> Categorías</button>
        <button className="mis_assets"> Mis assets</button>
      </div>

      <form action="buscar.html">
        <input type="text" placeholder="Buscar..." />
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
