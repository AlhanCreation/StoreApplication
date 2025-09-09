import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Auth components
import Login from '../pages/Login';
import Register from '../pages/Register';

// Home component
import Home from '../pages/Home';

// Admin components
import AdminDashboard from '../pages/Dashboard';
import UsersList from '../pages/UsersList';
import CreateUser from '../pages/CreateUser';
import CreateStore from '../pages/CreateStore';

// User components
import StoresList from '../pages/StoresList';
import StoreDetails from '../pages/StoreDetails';
import UserProfile from '../pages/UserProfile';

// Store owner components
import StoreDashboard from '../pages/StoreDashboard';

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
      
      {/* Public root route */}
      <Route path="/" element={<Home />} />
      
      {/* 404 route */}
      <Route path="*" element={<div className="text-center mt-5"><h1>404 Not Found</h1></div>} />
    </Routes>
  );
};

export default AppRoutes;