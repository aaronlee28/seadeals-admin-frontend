import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div>
    <div className="main-content">
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;
