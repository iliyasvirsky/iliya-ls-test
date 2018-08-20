import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

    <nav>
      <Link className="p-2 bd-highlight" to="/">Home</Link>
      <Link className="p-2 bd-highlight"  to="/users">All Users</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
