// src/Categories.js
import React, { useEffect, useState } from 'react';
import { getData } from './services/apiService';
import './Categories.css';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [assets, setAssets] = useState([]);
  const [category, setCategory] = useState("3D");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssets(category);
  }, [category]);

  const fetchAssets = async (cat) => {
    try {
      const res = await getData(`/asset/filtro/${cat}`);
      setAssets(res.resultado || []);
    } catch (err) {
      console.error("Error loading assets:", err);
    }
  };

  const availableCategories = ["3D", "2D", "AUDIO", "VIDEO", "SCRIPT", "IMAGE"];

  return (
    <div className="categories-container">
      <h2 className="categories-title">Filtro por Categoría</h2>

      <div className="categories-buttons">
        {availableCategories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${cat === category ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="categories-content">
        <div className="categories-assets">
          {assets.length === 0 ? (
            <p className="no-assets-message">No hay assets para esta categoría.</p>
          ) : (
            assets.map((asset) => (
              <div
                className="asset-card"
                key={asset._id}
                onClick={() => navigate(`/asset-view?id=${asset._id}`)}
              >
                <img src={asset.portada} alt={asset.nombre} />
                <h3>{asset.nombre}</h3>
                <p>By {asset.autor?.nombre_completo || "Unknown"}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
