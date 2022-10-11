import React, { FC, useState } from 'react';
import SidebarSellerData from './SidebarSellerData';
import SubMenu from './SubMenu';
import { ReactComponent as IconBurger } from '../../assets/svg/icon_burger.svg';
import { ReactComponent as IconClose } from '../../assets/svg/icon_close.svg';
import Logo from '../../assets/png/logo_sea_deals.png';

import './Sidebar.scss';

const Sidebar:FC<any> = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleNav = () => setShowSidebar(!showSidebar);

  return (
    <div className="">
      <div className="sidebar__nav">
        <div className="sidebar__nav-icon">
          {React.createElement(IconBurger, { className: 'nav-icon', onClick: toggleNav })}
        </div>
      </div>
      <nav className="sidebar__nav-content" style={{ left: showSidebar ? '0' : '-100%' }}>
        <div className="sidebar__wrap">
          <div className="sidebar__nav-icon justify-content-between">
            <img
              width={160}
              src={Logo}
              alt="sea_deals"
            />
            {React.createElement(IconClose, { className: 'nav-icon close-sidebar', onClick: toggleNav })}
          </div>
          {
            SidebarSellerData.map((item) => (
              <SubMenu item={item} key={item.id} />
            ))
          }
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
