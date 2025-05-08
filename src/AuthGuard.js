import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, redirige
      navigate('/auth/login', { replace: true });
      return;
    }

    // Si hay token, lo validamos en el back
    fetch('/validate', {
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
      });
  }, [navigate]);

  // Mientras no redirija, renderiza las rutas hijas
  return <Outlet />;
};

export default AuthGuard;
