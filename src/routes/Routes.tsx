import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROLES from '../constants/roles';
import Layout from '../layouts/Layout';
import SellerLayout from '../layouts/SellerLayout';
import AdminLayout from '../layouts/AdminLayout';
import PersistLogin from '../components/PersistLogin';
import RequireAuth from '../components/RequireAuth';
import SellerRegister from '../pages/Seller/Register/SellerRegister';
import AdminHome from '../pages/Admin/AdminHome';
import SellerHome from '../pages/Seller/SellerHome';
import Login from '../pages/Public/Login/Login';
import FormVoucher from '../pages/Seller/Voucher/FormVoucher';
import Register from '../pages/Register/Register';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/seller/register" element={<SellerRegister />} />

      <Route element={<PersistLogin />}>

        <Route element={<RequireAuth allowedRoles={[ROLES.Seller]} />}>
          <Route path="/seller/" element={<SellerLayout />}>
            <Route path="" element={<SellerHome />} />
            <Route path="voucher/new" element={<FormVoucher />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin/" element={<AdminLayout />}>
            <Route path="" element={<AdminHome />} />
          </Route>
        </Route>

      </Route>
    </Route>

  </Routes>
);

export default AppRoutes;
