import React, { useState } from 'react';
import { postData } from './services/apiService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
const navigate = useNavigate(); 

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar la recarga de la página
    setLoading(true);
    setMessage('');

    console.log('Enviando datos:', formData); // Verifica los datos antes de enviarlos

    try {
      const response = await postData('/auth/login', formData);
      navigate('/'); 
      setMessage('Datos enviados con éxito: ' + JSON.stringify(response));
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: '¡Alerta!',
        text: error.response.data.error,
        icon: 'error', // Tipo de alerta (success, error, info, warning)
        confirmButtonText: 'Aceptar', // Texto del botón
      });
      setMessage('Error al enviar datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
        <div className="p-4 rounded-3 shadow-lg" style={{ backgroundColor: '#333', width: '350px' }}>
          <h2 className="text-center fw-bold mb-3">Login</h2>

          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-0"
              placeholder="example@example.com..."
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-0"
              placeholder="Contraseña..."
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center mb-3">
            <a href="#" className="text-primary text-decoration-none">
              Olvidaste tu contraseña
            </a>
          </div>

          <button type="submit" disabled={loading} className="btn btn-success w-100 fw-bold">
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

          <div className="text-center mt-3">
            <a href="#" className="text-primary text-decoration-none">
              No tienes cuenta, crea una
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
