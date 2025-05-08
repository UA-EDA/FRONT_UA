import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { getData } from './services/apiService';
import Swal from 'sweetalert2';
import './AssetView.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AssetView = () => {
    const query = useQuery();
    const id = query.get("id");
    const navigate = useNavigate();
    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData(`asset/${id}`)
            .then(response => {
                if (response && response.resultado) setAsset(response.resultado);
                else throw new Error('Respuesta inválida');
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar el asset',
                    text: err.message || 'No se han podido obtener los datos.'
                });
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="av-loading">Cargando…</div>;
    if (!asset) return <div className="av-error">No se encontró el asset.</div>;

    // Función para manejar la descarga
    const handleDownload = async () => {
        try {
            // 1. Descarga el archivo como Blob
            const response = await fetch(asset.archivo, {
                // si tu API necesita headers o autenticación, añádelos aquí
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const blob = await response.blob();

            // 2. Crea una URL temporal para el Blob
            const url = window.URL.createObjectURL(blob);

            // 3. Crea el enlace y dispara la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = asset.nombre || 'archivo';
            document.body.appendChild(link);
            link.click();
            link.remove();

            // 4. Revoca la URL para liberar memoria
            window.URL.revokeObjectURL(url);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error descargando el asset',
                text: err.message || 'No se pudo completar la descarga.'
            });
        }
    };

    return (
        <div className="av-page">
            <div className="av-main">
                <div className="av-carousel">
                    <img src={asset.portada || 'default-image.jpg'} alt={asset.nombre} className="av-image" />
                    <div className="av-dots">
                        <span className="dot active" />
                        <span className="dot" />
                        <span className="dot" />
                    </div>
                </div>
                {Array.isArray(asset.categorias) && asset.categorias.includes('3D') && (
                    <>
                        <button className="av-3d-btn">VER MODELO 3D</button>
                    </>
                )}
                <div className="av-description">
                    <p>{asset.descripcion}</p>
                </div>
            </div>

            <aside className="av-sidebar">
                <div className="card av-header-card">
                    <h2>{asset.nombre.toUpperCase()}</h2>
                    <p>Por {asset.autor?.nombre_completo}</p>
                    <div className="av-category-row">
                        <p>CATEGORÍA</p>
                        <div className="av-tags">
                            <span key={asset.tipo} className="cat">{asset.tipo}</span>
                        </div>
                    </div>
                    <div className="av-category-row">
                        <p>ETIQUETAS</p>
                        <div className="av-tags">
                            {Array.isArray(asset.categorias) && asset.categorias.map(cat => (
                                <span key={cat} className="tag">{cat}</span>
                            ))}
                        </div>
                    </div>
                    <div className="av-rating">{"★".repeat(Math.round(asset.valoracion || 0))}</div>
                </div>

                <div className="card av-details-card">
                    <h3>Detalles</h3>
                    <ul>
                        <li><strong>Fecha de publicación:</strong> {new Date(asset.fecha_alta).toLocaleDateString()}</li>
                        <li><strong>Versión de software:</strong> {asset.version_software && asset.version_software !== "" ? (Array.isArray(asset.version_software) ? asset.version_software.join(', ') : asset.version_software) : "1.0.0"}</li>
                        {asset.numero_modelos && asset.numero_modelos !== "" && (
                            <li><strong>Número de modelos:</strong> {asset.numero_modelos}</li>
                        )}
                        <li><strong>Likes:</strong> {asset.likes || 0}</li>
                        <li><strong>Número de descargas:</strong> {asset.num_descargas || 0}</li>
                    </ul>
                </div>

                {/* Sección de Descarga en su propia sección abajo de los detalles */}
                <div className="av-download-section">
                    <button onClick={handleDownload} className="av-download-btn">Descargar Asset</button>
                </div>
            </aside>
        </div>
    );
};

export default AssetView;


