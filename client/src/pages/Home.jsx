import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Bienvenido a nuestra Aplicación</h1>
          <p className="py-6">
            Explora y agrega tus canciones favoritas a nuestra biblioteca. 
            ¡Comienza tu viaje musical ahora!
          </p>
          <Link to="/library">
            <button className="btn btn-primary">Ir a la Biblioteca</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;