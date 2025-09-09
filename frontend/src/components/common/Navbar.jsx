import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold text-primary">
          <i className="fas fa-home me-1"></i>StoreRate Pro
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link px-3 py-2 rounded">
                    <i className="fas fa-tachometer-alt me-1"></i>Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link px-3 py-2 rounded">
                    <i className="fas fa-user me-1"></i>Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/stores" className="nav-link px-3 py-2 rounded">
                    <i className="fas fa-store me-1"></i>Stores
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="btn btn-outline-danger ms-2 px-3 py-2 rounded">
                    <i className="fas fa-sign-out-alt me-1"></i>Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/stores" className="nav-link px-3 py-2 rounded">
                    <i className="fas fa-store me-1"></i>Stores
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link px-3 py-2 rounded">
                    <i className="fas fa-sign-in-alt me-1"></i>Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link px-3 py-2 rounded">
                    <i className="fas fa-user-plus me-1"></i>Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;