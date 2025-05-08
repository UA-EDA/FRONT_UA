import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./style.css";




const assets = [
  { title: "Roma", author: "Fidel Mas", imgSrc: "./roma.jpg", link: "" },
  { title: "Roma", author: "Fidel Mas", imgSrc: "roma.jpg", link: "" },
  { title: "Roma", author: "Fidel Mas", imgSrc: "roma.jpg", link: "" },
  { title: "Roma", author: "Fidel Mas", imgSrc: "roma.jpg", link: "" },
  { title: "Roma", author: "Fidel Mas", imgSrc: "roma.jpg", link: "" },
];

const Contenedor = ({ titulo, assets }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const maxPage = Math.floor((assets.length - 1) / itemsPerPage); // Ajuste para evitar página vacía

  const nextPage = () => {
    setCurrentPage((prev) => (prev < maxPage ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const visibleAssets = assets.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="contenedor">
      <div className="contenido">
        <h2 className="titulo-seccion">{titulo}</h2>
        <div className="contenido-scroll">
          <button className="flecha izquierda" onClick={prevPage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className="asset-list">
            {visibleAssets.map((asset, index) => (
              <div className="asset" key={index}>
                <a href={asset.link}>
                  <img src={asset.imgSrc} alt={`Viaje a ${asset.title}`} />
                </a>
                <h3 title={asset.title}>{asset.title}</h3>
                <p>Por {asset.author}</p>
              </div>
            ))}
          </div>

          <button className="flecha derecha" onClick={nextPage}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

const MainContent = () => {
  return (
    <div>
      <Contenedor titulo="PUBLICACIONES RECIENTES" assets={assets} />
      <Contenedor titulo="CONTENIDO GRATUITO" assets={assets} />
      <Contenedor titulo="MATERIALES Y TEXTURAS" assets={assets} />
    </div>
  );
};

export default MainContent;
