import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getData, putData } from './services/apiService';
import LangContext from "./LangContext";
import translations from "./translations";
import useTema from './useTema';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const EditAsset = () => {
    useTema();
    const query = useQuery();
    const id = query.get("id")
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("");
    const [categories, setCategories] = useState("");
    const [asset, setFoto] = useState("");
    const [portada, setPortada] = useState("");
    const [error, setError] = useState("");

    const { lang } = useContext(LangContext);
    const t = translations[lang];

    useEffect(() => {
        const fetchAsset = async () => {
            try {
                const assetData = await getData(`/asset/${id}`);
                const asset = assetData.resultado;
                setNombre(asset.nombre);
                setDescripcion(asset.descripcion);
                setTipo(asset.tipo);
                setCategories(asset.categorias.join(', '));

                // Convertir la URL a base64
                if (asset.portada) {
                    const base64Portada = await urlToBase64(asset.portada);
                    setPortada(base64Portada);
                }

                if (asset.asset) {
                    const base64Asset = await urlToBase64(asset.asset);
                    setFoto(base64Asset);
                }

            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'No se pudo cargar el asset', 'error');
            }
        };
        fetchAsset();
    }, [id]);

    const urlToBase64 = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        let categorias = categories.split(',').map(x => x.trim());

        try {
            const data = {
                nombre,
                descripcion,
                tipo,
                categorias,
            };
            if (asset) {
                data.asset = asset;
            }
            if (portada) {
                data.portada = portada;
            }
            await putData(`/asset/edit/${id}`, data);
            Swal.fire('Éxito', 'Asset actualizado correctamente', 'success');
            //navigate('/');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', error.response?.data?.error || 'No se pudo actualizar el asset', 'error');
        }
    };

    const changeImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setFoto(reader.result);
    };

    const changePortada = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setPortada(reader.result);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'transparent', paddingTop: '40px', paddingBottom: '60px' }}>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <div className="container p-4" style={{
                    backgroundColor: "#2a2a2a",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                    width: "500px"
                }}>
                    <h2 className="text-center text-white fw-bold mb-3">{t.upload.title_edit || 'Editar Asset'}</h2>
                    <div className="mb-3">
                        <label className="form-label text-white">{t.upload.asset_name}</label>
                        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">{t.upload.description}</label>
                        <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">{t.upload.category}</label>
                        <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                            <option value="" disabled hidden>{t.upload.select_category}</option>
                            <option value="3D">3D</option>
                            <option value="2D">2D</option>
                            <option value="AUDIO">AUDIO</option>
                            <option value="VIDEO">VIDEO</option>
                            <option value="SCRIPT">SCRIPT</option>
                            <option value="IMAGE">IMAGE</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">{t.upload.tags}</label>
                        <input type="text" className="form-control" value={categories} onChange={(e) => setCategories(e.target.value)} required />
                        {error && <div className="text-danger mt-1">{error}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">{t.upload.file}</label>
                        <input type="file" className="form-control" onChange={changeImage} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">{t.upload.cover}</label>
                        <input type="file" accept="image/*" className="form-control" onChange={changePortada} />
                    </div>
                    <div className="mb-3">
                        {portada && <img src={portada} alt="Vista previa" style={{ width: '300px', height: '150px' }} />}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        {t.upload.submit_edit || 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAsset;
