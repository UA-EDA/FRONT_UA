
import React, { useState } from "react";
import { postData } from './services/apiService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';




const UploadAsset = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("");
    const [categories, setCategories] = useState("");
    const [asset, setFoto] = useState("");
    const [portada, setPortada] = useState("");

    const [error, setError] = useState(""); // Error de validación


    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar la recarga de la página



        setError(""); // Limpiar error si todo va bien

        // console.log('Enviando datos:', { nombre_completo, email, password, foto }); // Verifica los datos antes de enviarlos

        let categorias = categories.split(',');

        categorias = categorias.map(x => x.trim());

        try {
            const response = await postData('/asset/subir', { nombre, descripcion, tipo, asset, categorias, portada });
            Swal.fire({
                title: '¡Alerta!',
                text: 'Asset Creado correctamente',
                icon: 'success', // Tipo de alerta (success, error, info, warning)
                confirmButtonText: 'Aceptar', // Texto del botón
            });

            navigate('/');
            // setMessage('Datos enviados con éxito: ' + JSON.stringify(response));
        } catch (error) {
            console.log(error);



            Swal.fire({
                title: '¡Alerta!',
                text: error.response.data ? error.response.data.error : 'No se ha podido guardar los datos',
                icon: 'error', // Tipo de alerta (success, error, info, warning)
                confirmButtonText: 'Aceptar', // Texto del botón
            });
            // setMessage('Error al enviar datos.');
        } finally {
            // setLoading(false);
        }
    };


    const changeImage = (e) => {
        const file = e.target.files[0]; // Obtén el primer archivo seleccionado
        if (!file) return;

        const reader = new FileReader(); // Crea un FileReader
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos

        // Cuando la carga del archivo termina, actualiza el estado
        reader.onloadend = () => {
            setFoto(reader.result); // Actualiza el estado con la URL de la imagen
        };
    };


    const changePortada = (e) => {
        const file = e.target.files[0]; // Obtén el primer archivo seleccionado
        if (!file) return;

        const reader = new FileReader(); // Crea un FileReader
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos

        // Cuando la carga del archivo termina, actualiza el estado
        reader.onloadend = () => {
            setPortada(reader.result); // Actualiza el estado con la URL de la imagen
        };
    };

    return (

        <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center vh-100">
            <div className="container p-4" style={{ backgroundColor: "#2a2a2a", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "350px" }}>
                <h2 className="text-center text-white">Sube tu Asset</h2>
                <div className="mb-3">
                    <label className="form-label text-white">Nombre del asset</label>
                    <input type="text" className="form-control" placeholder="Nombre del asset..." required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Descripción del asset</label>
                    <textarea
                        className="form-control"
                        placeholder="Descripción..."
                        required
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        style={{
                            resize: 'vertical',      // solo escala en eje Y
                            minHeight: '100px',
                            maxHeight: '400px',
                            overflow: 'auto'         // muestra scroll si supera maxHeight
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Categorias</label>
                    <select id="tipo" name="tipo" className="form-control" required value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="" disabled hidden>Seleccionar una categoria</option>
                        <option value="3D">3D</option>
                        <option value="2D">2D</option>
                        <option value="AUDIO">AUDIO</option>
                        <option value="VIDEO">VIDEO</option>
                        <option value="SCRIPT">SCRIPT</option>
                        <option value="IMAGE">IMAGE</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Etiquetas</label>
                    <input type="text" className="form-control" placeholder="Star Wars, Videojuegos,..." required value={categories} onChange={(e) => setCategories(e.target.value)} />
                    {error && <div className="text-danger mt-1">{error}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">Archivo</label>
                    <input type="file" className="form-control" onChange={changeImage} required multiple />
                </div>

                <div className="mb-3">
                    <label className="form-label text-white">Portada</label>
                    <input type="file" accept="image/*" className="form-control" onChange={changePortada} required multiple />
                </div>

                <div className="mb-3 justify-content">
                    {portada && <img src={portada} alt="Vista previa" style={{ width: '300px', height: '150px' }} />}
                </div>


                <button type="submit" className="btn btn-primary w-100">Subir</button>
            </div>
        </form>



    );
};

export default UploadAsset;