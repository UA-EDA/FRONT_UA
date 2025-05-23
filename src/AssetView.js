import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getData, postData } from './services/apiService';
import Swal from 'sweetalert2';
import './AssetView.css';
import useTema from './useTema';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as solidThumbsUp, faThumbsDown as solidThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularThumbsUp, faThumbsDown as regularThumbsDown } from '@fortawesome/free-regular-svg-icons';

import LangContext from "./LangContext";
import translations from "./translations";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const StarRatingInput = ({ rating, setRating }) => {
    return (
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    style={{ cursor: 'pointer', color: star <= rating ? '#FFD700' : '#ccc', fontSize: '24px' }}
                    onClick={() => setRating(star)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter') setRating(star) }}
                    aria-label={`Calificar con ${star} estrellas`}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

const AssetView = () => {

    useTema();
    const query = useQuery();
    const id = query.get("id");

    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userVote, setUserVote] = useState(null); // null, true (like), false (dislike)

    // Comentarios
    const [comentarios, setComentarios] = useState([]);
    const [visibleComentarios, setVisibleComentarios] = useState(5);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [nuevaValoracion, setNuevaValoracion] = useState(0);
    const [enviandoComentario, setEnviandoComentario] = useState(false);

    const { lang } = React.useContext(LangContext);
    const t = translations[lang];

    const loadComentarios = React.useCallback(async () => {
        try {
            const response = await getData(`asset/todos-comentarios/${id}`);
            if (response && response.resultado) {
                setComentarios(response.resultado);
            } else {
                setComentarios([]);
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudieron cargar los comentarios', 'error');
        }
    }, [id]);

    useEffect(() => {
        setLoading(true);

        getData(`asset/${id}`)
            .then(response => {
                if (response && response.resultado) setAsset(response.resultado);
                else throw new Error('Respuesta inválida');
            })
            .catch(err => {
                /*Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar el asset',
                    text: err.message || 'No se han podido obtener los datos.'
                });*/
            })
            .finally(() => setLoading(false));

        getData(`asset/like?assetId=${id}`)
            .then(response => {
                const voto = response.resultado;
                if (voto != null) {
                    setUserVote(voto);
                }
            })
            .catch(err => {
                /*Swal.fire({
                    icon: 'error',
                    title: 'Error al recuperar valoraciones',
                    text: err.message || 'No se han podido obtener los datos.'
                });*/
            });

        loadComentarios();

    }, [id, loadComentarios]);


    const handleVerMasComentarios = () => {
        setVisibleComentarios((prev) => Math.min(prev + 5, comentarios.length));
    };

    const handleEnviarComentario = async () => {
        if (nuevoComentario.trim() === "") {
            Swal.fire('Error', 'El comentario no puede estar vacío', 'error');
            return;
        }
        if (nuevaValoracion < 1 || nuevaValoracion > 5) {
            Swal.fire('Error', 'La valoración debe ser entre 1 y 5 estrellas', 'error');
            return;
        }

        setEnviandoComentario(true);

        try {
            // POST /asset/comentario?assetId=X&commentId=X
            // Si no tienes commentId, mandamos null o '' (depende backend)
            await postData('/asset/comentario', {
                assetId: id,
                comentario: nuevoComentario,
                valoracion: nuevaValoracion,
            });

            Swal.fire('Comentario enviado', '', 'success');
            setNuevoComentario('');
            setNuevaValoracion(0);

            // Recargar comentarios después de enviar
            await loadComentarios();
            setVisibleComentarios(5);

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo enviar el comentario', 'error');
        } finally {
            setEnviandoComentario(false);
        }
    };

    if (loading) return <div className="av-loading">Cargando…</div>;
    if (!asset) return <div className="av-error">No se encontró el asset.</div>;

    const handleDownload = async () => {
        try {
            const response = await fetch(asset.archivo);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = asset.nombre || 'archivo';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            await postData('/asset/increment-download', { id });
            setAsset(prev => ({ ...prev, num_descargas: (prev.num_descargas || 0) + 1 }));
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error descargando el asset',
                text: err.message || 'No se pudo completar la descarga.'
            });
        }
    };

    const handleScore = async (isLiked) => {
        try {
            const updatedAsset = await postData('/asset/like', { id, isLiked });
            if (isLiked === userVote) {
                isLiked = !isLiked;
                setUserVote(undefined);
            }
            else {
                setUserVote(isLiked);
            }
            setAsset(prev => ({ ...prev, likes: updatedAsset.resultado.likes }));
        } catch (error) {
            console.error(error);
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
                    <p>{t.asset.by} {asset.autor?.nombre_completo}</p>
                    <div className="av-category-row">
                        <p>{t.asset.category}</p>
                        <div className="av-tags">
                            <span key={asset.tipo} className="cat">{asset.tipo}</span>
                        </div>
                    </div>
                    <div className="av-category-row">
                        <p>{t.asset.tags}</p>
                        <div className="av-tags">
                            {Array.isArray(asset.categorias) && asset.categorias.map(cat => (
                                <span key={cat} className="tag">{cat}</span>
                            ))}
                        </div>
                    </div>
                    <div className="av-rating">{"★".repeat(Math.round(asset.valoracion || 0))}</div>
                </div>

                <div className="card av-details-card">
                    <h3>{t.asset.details}</h3>
                    <ul>
                        <li><strong>{t.asset.date}:</strong> {new Date(asset.fecha_alta).toLocaleDateString()}</li>
                        <li><strong>{t.asset.software}:</strong> {asset.version_software && asset.version_software !== "" ? (Array.isArray(asset.version_software) ? asset.version_software.join(', ') : asset.version_software) : "1.0.0"}</li>
                        {asset.numero_modelos && asset.numero_modelos !== "" && (
                            <li><strong>{t.asset.models}:</strong> {asset.numero_modelos}</li>
                        )}
                        <li><strong>{t.asset.likes}:</strong> {asset.likes || 0}</li>
                        <li><strong>{t.asset.downloads}:</strong> {asset.num_descargas || 0}</li>
                    </ul>
                </div>

                <li className="av-action-buttons">
                    <button className="av-like-btn" onClick={() => handleScore(true)}>
                        <FontAwesomeIcon
                            icon={userVote === false || userVote === undefined ? regularThumbsUp : solidThumbsUp}
                            color={userVote === true || userVote === undefined ? '#0a84ff' : '#888'}
                        />
                    </button>

                    <button className="av-like-btn" onClick={() => handleScore(false)}>
                        <FontAwesomeIcon
                            icon={userVote === true || userVote === undefined ? regularThumbsDown : solidThumbsDown}
                            color={userVote === false || userVote === undefined ? '#ff3b30' : '#888'}
                        />
                    </button>

                    <div className="av-download-section">
                        <button onClick={handleDownload} className="av-download-btn">
                            {t.asset.download}
                        </button>
                    </div>
                </li>

                {/* --- Sección de Comentarios --- */}
                <section className="av-comments-section" aria-label="Comentarios del asset">
                    <h3>{t.asset.comments}</h3>

                    {/* Formulario para nuevo comentario */}
                    <div className="av-new-comment">
                        <textarea
                            placeholder="Escribe tu comentario aquí..."
                            value={nuevoComentario}
                            onChange={e => setNuevoComentario(e.target.value)}
                            rows={3}
                            aria-label="Nuevo comentario"
                            disabled={enviandoComentario}
                        />
                        <StarRatingInput rating={nuevaValoracion} setRating={setNuevaValoracion} />
                        <button
                            className="btn-send-comment"
                            onClick={handleEnviarComentario}
                            disabled={enviandoComentario}
                            aria-label="Enviar comentario"
                        >
                            {enviandoComentario ? 'Enviando...' : 'Enviar comentario'}
                        </button>
                    </div>

                    {/* Lista de comentarios */}
                    <ul className="av-comments-list" aria-live="polite" aria-relevant="additions">
                        {comentarios.length === 0 && <li>No hay comentarios aún.</li>}
                        {comentarios.slice(0, visibleComentarios).map((comentario) => (
                            <li key={comentario._id || comentario.id} className="av-comment-item">
                                <div className="comment-header">
                                    <div className="comment-meta">
                                        <span className="comment-author">
                                            {(comentario.autor && comentario.autor.nombre) ? comentario.autor.nombre : 'Anónimo'}
                                        </span>
                                        <span className="comment-date">
                                            {new Date(comentario.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="comment-rating">
                                        {"★".repeat(comentario.valoracion || 0)}
                                        {"☆".repeat(5 - (comentario.valoracion || 0))}
                                    </div>
                                </div>
                                <p className="comment-content">{comentario.comentario}</p>
                            </li>
                        ))}
                    </ul>

                    {visibleComentarios < comentarios.length && (
                        <button
                            onClick={handleVerMasComentarios}
                            className="btn-load-more"
                            aria-label="Ver más comentarios"
                        >
                            Ver más
                        </button>
                    )}
                </section>
            </aside>
        </div>
    );
};

export default AssetView;