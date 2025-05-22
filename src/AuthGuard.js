import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getValidateToken } from "./services/apiService";

const AuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = '';
    if (typeof window !== 'undefined') {
      // El código que usa localStorage va aquí
      // Ejemplo: localStorage.setItem('clave', 'valor');
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
        // Hacer algo con el valor en localStorage
      }
    }
   
    if (!token) {
      // Si no hay token, redirige
      navigate('/auth/login', { replace: true });
      return;
    }

    
    getValidateToken('/auth/validate').then(x => {
      if (x.status !== 200) {
        navigate('/auth/login', { replace: true });
      }
    }).catch(() => navigate('/auth/login', { replace: true }));
    // Si hay token, lo validamos en el back
   /* fetch('/auth/validate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          // token válido, dejamos continuar
        } else {
          // token inválido o expirado
          navigate('/auth/login', { replace: true });
        }
      })
      .catch(() => {
        // error de red o similar
        navigate('/auth/login', { replace: true });
      });*/
  }, [navigate]);

  // Mientras no redirija, renderiza las rutas hijas
  return <Outlet />;
};

export default AuthGuard;
