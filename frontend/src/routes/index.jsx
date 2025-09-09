import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Auth components
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

// Home component
import Home from '../components/common/Home';

// Admin components
import AdminDashboard from '../components/admin/Dashboard';
import UsersList from '../components/admin/UsersList';
import CreateUser from '../components/admin/CreateUser';
import CreateStore from '../components/admin/CreateStore';

// User components
import StoresList from '../components/user/StoresList';
import StoreDetails from '../components/user/StoreDetails';
import UserProfile from '../components/user/UserProfile';

// Store owner components
import StoreDashboard from '../components/store-owner/StoreDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes for System Administrator */}
      <Route element={<ProtectedRoute allowedRoles={['System Administrator']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/create-user" element={<CreateUser />} />
        <Route path="/admin/create-store" element={<CreateStore />} />
      </Route>
      
      {/* Protected routes for Store Owner */}
      <Route element={<ProtectedRoute allowedRoles={['Store Owner']} />}>
        <Route path="/owner/dashboard" element={<StoreDashboard />} />
      </Route>
      
      {/* Protected routes for any authenticated user */}
      <Route element={<ProtectedRoute allowedRoles={['System Administrator', 'Store Owner', 'Normal User']} />}>
        <Route path="/stores" element={<StoresList />} />
        <Route path="/stores/:id" element={<StoreDetails />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      
      {/* Protected root route for authenticated users */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<div className="text-center mt-5"><h1>404 Not Found</h1></div>} />
    </Routes>
  );
};

export default AppRoutes;