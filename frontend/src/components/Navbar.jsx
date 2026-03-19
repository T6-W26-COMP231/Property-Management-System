// frontend/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Logo.jpeg';

const Navbar = ({ userRole }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Define nav links based on the user's role
  const navLinks = {
    guest: [
      { label: 'Home', path: '/' },
      { label: 'Contact Support', path: '/contact' },
    ],
    landlord: [
      { label: 'Dashboard', path: '/landlord/dashboard' },
      { label: 'Messages', path: '/landlord/messages' },
    ],
    resident: [
      { label: 'Dashboard', path: '/resident/dashboard' },
      { label: 'Messages', path: '/resident/messages' },
    ],
    contractor: [
      { label: 'Dashboard', path: '/contractor/dashboard' },
      { label: 'Messages', path: '/contractor/messages' },
    ],
  };

  const links = navLinks[userRole] || navLinks.guest;
  const isGuest = !userRole || userRole === 'guest';

  // helper function to close moble menu when a link is clicked 
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-md bg-white sticky-top shadow-sm border-bottom py-2 px-md-4">
      <div className="container-fluid">
        
        {/* Logo */}
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          <img 
            src={logo} 
            alt="Property Management System" 
            style={{ height: '50px', borderRadius: '8px', objectFit: 'contain' }} 
          />
        </Link>

        {/* Hamburger Toggle Button for Mobile */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content (Links & Auth) */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          
          {/* Nav Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-md-0 gap-md-4">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li className="nav-item" key={link.path}>
                  <Link
                    to={link.path}
                    className={`nav-link fw-medium transition-all ${isActive ? 'text-primary border-bottom border-primary border-2' : 'text-dark'}`}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Login + Sign Up Buttons */}
          {isGuest && (
            <div className="d-flex flex-column flex-md-row gap-2 mt-3 mt-md-0">
              <Link 
                to="/login" 
                className="btn btn-outline-primary fw-semibold px-4" 
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="btn btn-primary fw-semibold px-4" 
                onClick={handleLinkClick}
              >
                Sign Up
              </Link>
            </div>
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;