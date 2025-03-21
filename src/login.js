import React from "react";

const Login = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light" 
             style={{ background: "url('https://source.unsplash.com/1600x900/?abstract,technology') no-repeat center/cover" }}>
            
            {/* Caja del formulario */}
            <div className="p-4 rounded-3 shadow-lg" style={{ backgroundColor: "#333", width: "350px" }}>
                <h2 className="text-center fw-bold mb-3">Login</h2>
                
                <div className="mb-2">
                    <label className="form-label">Nombre de usuario</label>
                    <input type="text" className="form-control bg-dark text-light border-0" placeholder="Usuario..." />
                </div>

                <div className="mb-2">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control bg-dark text-light border-0" placeholder="Contraseña..." />
                </div>

                <div className="text-center mb-3">
                    <a href="#" className="text-primary text-decoration-none">Olvidaste tu contraseña</a>
                </div>

                <button className="btn btn-success w-100 fw-bold">Iniciar sesión</button>

                <div className="text-center mt-3">
                    <a href="#" className="text-primary text-decoration-none">No tienes cuenta, crea una</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
