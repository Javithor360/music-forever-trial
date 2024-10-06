import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <span className="btn btn-ghost normal-case text-xl">Mi Aplicación</span>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li><Link to="/library">Biblioteca</Link></li>
          <li><Link to="/new">Agregar</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;