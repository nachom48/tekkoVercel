import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './shared/reducers/authContext';
import Login from './modules/userManagement/auth/components/login/logIn';
import PrivateRoute from './components/privateRoute/privateRoute';
import ClientDashboard from './pages/client/clientDashboard';
import AdminDashboard from './pages/admin/adminDashboard';
import SupplierDashboard from './pages/supplier/supplierDashboard';
import Register from './modules/userManagement/user/pages/register';
import Success from './pages/feedback/success';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-user" element={<Register user={'user'} />} />
        <Route path="/register-tekko" element={<Register user={'tekko'} />} />
        <Route path="/success-tekko" element={<Success user={'tekko'} />} />
        <Route path="/success-user" element={<Success user={'user'} />} />
        <Route
          path="/dashboard-cliente"
          element={
            <PrivateRoute roles={['client']} element={<ClientDashboard />} />
          }
        />
        <Route
          path="/dashboard-proveedor"
          element={
            <PrivateRoute roles={['provider']} element={<SupplierDashboard />} />
          }
        />
        <Route
          path="/dashboard-admin"
          element={
            <PrivateRoute roles={['Admin']} element={<AdminDashboard />} />
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
