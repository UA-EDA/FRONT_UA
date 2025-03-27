
import React, { useState } from "react";
import { postData } from './services/apiService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; 




const Register = () => {
    const navigate = useNavigate(); 
    const [nombre_completo, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [foto, setFoto] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar la recarga de la página
      
    
        console.log('Enviando datos:', { nombre_completo, email, password, foto }); // Verifica los datos antes de enviarlos
    
        try {
          const response = await postData('/auth/register', { nombre_completo, email, password, foto });
          Swal.fire({
            title: '¡Alerta!',
            text: 'Usuario Creado correctamente',
            icon: 'success', // Tipo de alerta (success, error, info, warning)
            confirmButtonText: 'Aceptar', // Texto del botón
          });

          navigate('/auth/login'); 
         // setMessage('Datos enviados con éxito: ' + JSON.stringify(response));
        } catch (error) {
          console.log(error);
    
          Swal.fire({
            title: '¡Alerta!',
            text: error.response.data.error,
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
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#121212" }}>
            <div className="container p-4" style={{ backgroundColor: "#2a2a2a", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "350px" }}>
                <h2 className="text-center text-white">Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-white">Nombre</label>
                        <input type="text" className="form-control" placeholder="Tu nombre" required value={nombre_completo} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Email</label>
                        <input type="email" className="form-control" placeholder="Tu email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Contraseña</label>
                        <input type="password" className="form-control" placeholder="Tu contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Foto de perfil</label>
                        <input type="file" className="form-control" accept="image/*" onChange={changeImage} />

                        {foto && <img src={foto} alt="Vista previa" style={{ width: '100px', height: '100px' }} />}
                    </div>


                    <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                </form>
                <a href="#" className="d-block text-center mt-3" style={{ color: "#0094ff" }}>¿Ya tienes cuenta? Inicia sesión</a>
            </div>
        </div>
    );
};

export default Register;