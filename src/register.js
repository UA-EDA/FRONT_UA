
import React, { useState } from "react";
import { postData } from './services/apiService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import LangContext from "./LangContext";
import translations from "./translations";


const Register = () => {
    const navigate = useNavigate();
    const { lang } = useContext(LangContext);
    const t = translations[lang];
    const [nombre_completo, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [foto, setFoto] = useState("");
    const [error, setError] = useState(""); // Error de validación


    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar la recarga de la página


        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setError(""); // Limpiar error si todo va bien

        console.log('Enviando datos:', { nombre_completo, email, password, foto }); // Verifica los datos antes de enviarlos

        try {
            await postData('/auth/register', { nombre_completo, email, password, foto });
            Swal.fire({
                title: '¡Alerta!',
                text: 'Usuario Creado correctamente',
                icon: 'success', // Tipo de alerta (success, error, info, warning)
                confirmButtonText: 'Aceptar', // Texto del botón
            });
            const loginResponse = await postData('/auth/login', { email, password });
            localStorage.setItem('token', loginResponse.token);
            localStorage.setItem('nombre', loginResponse.nombre);
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

    return (



        <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center vh-100" >

            <div className="container p-4" style={{ backgroundColor: "#2a2a2a", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "350px" }}>
                <h2 className="text-center text-white fw-bold mb-3">{t.register.title}</h2>
                <div className="mb-3">
                    <label className="form-label text-white">{t.register.name}</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t.register.name_placeholder}
                        required
                        value={nombre_completo}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">{t.register.email}</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder={t.register.email_placeholder}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">{t.register.password}</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder={t.register.password_placeholder}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">{t.register.confirm_password}</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder={t.register.confirm_password_placeholder}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <div className="text-danger mt-1">{t.register.password_mismatch}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label text-white">{t.register.photo}</label>
                    <input type="file" className="form-control" accept="image/*" onChange={changeImage} required />
                </div>
                <div className="mb-3 justify-content">
                    {foto && <img src={foto} alt="Vista previa" style={{ width: '300px', height: '150px' }} />}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    {t.register.submit}
                </button>
                <button
                    onClick={() => navigate("/auth/login")}
                    className="d-block text-center mt-3 btn btn-light"
                    style={{ color: "#0094ff" }}
                >
                    {t.register.have_account}
                </button>
            </div>

        </form>


    );
};

export default Register;