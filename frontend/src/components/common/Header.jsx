import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Store Rating App
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.name}</span>
              {user.role === 'System Administrator' && (
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              )}
              {user.role === 'Store Owner' && (
                <Link to="/store-owner/dashboard">Store Dashboard</Link>
              )}
              {user.role === 'Normal User' && (
                <Link to="/user/stores">Stores</Link>
              )}
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;