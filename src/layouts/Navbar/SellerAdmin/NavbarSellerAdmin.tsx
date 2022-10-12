import React, { FC, useState } from 'react';
import './NavbarSellerAdmin.scss';
import { Link } from 'react-router-dom';
import NavbarMenuItem from './NavbarMenuItem';
import { ReactComponent as IconClose } from '../../../assets/svg/icon_close.svg';
import useAuth from '../../../hooks/useAuth';

const NavbarSellerAdmin:FC<any> = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { auth } = useAuth();
  const { user } = auth;

  return (
    <div className="d-flex align-items-center">
      <Link
        className="navbar__profile"
        to="/"
        onClick={(e) => {
          e.preventDefault();
          setShowDropDown(!showDropDown);
        }}
      >
        <img src="https://via.placeholder.com/100" alt="profile" />
        {user.username}
      </Link>
      {showDropDown && (
      <div className="navbar__dropdown-menu shadow">
        <NavbarMenuItem title="Logout" to="/logout" icon={IconClose} />
        <NavbarMenuItem title="Logout" to="/logout" icon={IconClose} />
        <NavbarMenuItem title="Logout" to="/logout" icon={IconClose} />
      </div>
      )}
    </div>
  );
};

export default NavbarSellerAdmin;
