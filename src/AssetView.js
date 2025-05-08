import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getData } from './services/apiService';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

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
                if (response && response.resultado) {
                    setAsset(response.resultado);
                } else {
                    throw new Error('Respuesta inválida');
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar el asset',
                    text: err.message || 'No se han podido obtener los datos.'
                });
                //navigate(-1);
            })
            .finally(() => setLoading(false));
    }, [id, navigate]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!asset) {
        return <p>No se encontró el asset.</p>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>{asset.nombre}</h1>
            {asset.archivo && (
                <img
                    src={asset.archivo}
                    alt={asset.nombre}
                    style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
                />
            )}
            <p><strong>Descripción:</strong> {asset.descripcion}</p>
            <p><strong>Categorías:</strong> {asset.categorias.join(', ')}</p>
            <p><strong>Tipo:</strong> {asset.tipo}</p>
            <p><strong>Fecha de alta:</strong> {new Date(asset.fecha_alta).toLocaleDateString()}</p>
            <p><strong>Autor:</strong> {asset.autor?.nombre || 'Desconocido'}</p>
            <button onClick={() => navigate(-1)}>Volver</button>
        </div>
    );
};

export default AssetView;
