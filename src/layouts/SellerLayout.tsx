import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import SidebarSellerData from './Sidebar/SidebarSellerData';

const SellerLayout = () => (
  <div>
    <Sidebar data={SidebarSellerData} />
    <div className="">
      <Outlet />
    </div>
  </div>
);

export default SellerLayout;
