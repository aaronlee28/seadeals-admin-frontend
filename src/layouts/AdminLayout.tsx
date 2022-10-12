import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import SidebarAdminData from './Sidebar/SidebarAdminData';

const AdminLayout = () => (
  <div>
    <Sidebar data={SidebarAdminData} />
    <div className="main-content">
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;
