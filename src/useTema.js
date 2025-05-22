import { useEffect } from 'react';

const useTema = () => {
  useEffect(() => {
    const modoClaro = localStorage.getItem('modoClaro') === 'true';
    document.body.classList.toggle('modo-claro', modoClaro);
    document.body.classList.toggle('modo-oscuro', !modoClaro);

    const fuenteGrande = localStorage.getItem('fuenteGrande') === 'true';
    document.body.classList.toggle('fuente-grande', fuenteGrande);
  }, []);
};

export default useTema;
