import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="shadow-lg navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="text-xl normal-case btn btn-ghost">Music Forever</Link>
      </div>
      <div className="flex-none">
        <ul className="p-0 menu menu-horizontal">
          <li><Link to="/library">Library</Link></li>
          <li><Link to="/new">Add new</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;