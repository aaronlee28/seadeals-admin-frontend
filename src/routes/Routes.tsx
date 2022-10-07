import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ROLES from '../constants/roles';
import Layout from '../layouts/Layout';
import SellerLayout from '../layouts/SellerLayout';
import AdminLayout from '../layouts/AdminLayout';
import PersistLogin from '../components/PersistLogin';
import RequireAuth from '../components/RequireAuth';
import SellerRegister from '../pages/Public/SellerRegister';
import AdminHome from '../pages/Admin/AdminHome';
import SellerHome from '../pages/Seller/SellerHome';
import Login from '../pages/Public/Login';
import FormVoucher from '../pages/Seller/Voucher/FormVoucher';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/seller/register" element={<SellerRegister />} />

      <Route element={<PersistLogin />}>

        <Route element={<RequireAuth allowedRoles={[ROLES.Seller]} />}>
          <Route path="/seller/" element={<SellerLayout />}>
            <Route path="" element={<SellerHome />} />
            <Route path="voucher/">
              <Route path="new" element={<FormVoucher formType="create" />} />
              <Route path="show/:voucherID" element={<FormVoucher formType="show" />} />
              <Route path="update/:voucherID" element={<FormVoucher formType="update" />} />
            </Route>
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
