import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
import Layout from './components/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/dashboard/Dashboard';
import Products from './components/products/Products';
import Orders from './components/orders/Orders';
import Profile from './components/settings/Profile';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route
                path="dashboard"
                element={
                  <RoleBasedRoute allowedRoles={['admin', 'manager', 'user']}>
                    <Dashboard />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="products"
                element={
                  <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                    <Products />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <RoleBasedRoute allowedRoles={['admin', 'manager', 'user']}>
                    <Orders />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <RoleBasedRoute allowedRoles={['admin', 'manager', 'user']}>
                    <Profile />
                  </RoleBasedRoute>
                }
              />
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
};

export default App; 