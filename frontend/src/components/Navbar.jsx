// frontend/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Logo.jpeg';
import './Navbar.css';

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

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Property Management System" />
        </Link>
      </div>

      {/* Nav Links */}
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}

        {/* Login + Sign Up inside mobile menu */}
        {isGuest && (
          <li className="navbar-auth-mobile">
            <Link to="/login" className="btn-login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="btn-signup" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>
          </li>
        )}
      </ul>

      {/* Login + Sign Up buttons — desktop only */}
      {isGuest && (
        <div className="navbar-auth">
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/signup" className="btn-signup">Sign Up</Link>
        </div>
      )}

      {/* Hamburger for mobile */}
      <button
        className="navbar-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>
  );
};

export default Navbar;