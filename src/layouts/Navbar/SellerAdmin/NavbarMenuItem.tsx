import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const NavbarMenuItem:FC<any> = ({ title, to, icon }) => (
  <Link
    className="navbar__link"
    to={to}
  >
    {React.createElement(icon, { className: 'navbar__icon' })}
    <span className="navbar__title">{title}</span>
  </Link>
);

export default NavbarMenuItem;
