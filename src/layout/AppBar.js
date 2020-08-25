import React from 'react';
import {Link} from 'react-router-dom';



function Nav() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to = "/" className = "navbar-brand">Vulcanizadora JAM </Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;