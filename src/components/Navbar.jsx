import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="navbar-backdrop"></div>
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">Orbit CLI</span>
        </Link>
        
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link 
                to="/home" 
                className={`navbar-link ${location.pathname === '/home' ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/models" 
                className={`navbar-link ${location.pathname === '/models' ? 'active' : ''}`}
              >
                Models
              </Link>
              <div className="navbar-user">
                <div className="user-avatar">
                  <span className="avatar-text">{getInitials(user?.name)}</span>
                </div>
                <span className="user-name">{user?.name || 'User'}</span>
                <button onClick={handleLogout} className="navbar-logout">
                  <span>Logout</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6M10 11L14 8M14 8L10 5M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="navbar-link navbar-link-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

