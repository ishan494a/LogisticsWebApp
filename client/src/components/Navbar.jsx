import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logoSrc }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: '1.5rem 2rem' }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logoSrc}
            alt="Logo"
            className="me-2"
            style={{ 
              width: '70px', 
              height: '70px',
              transform: 'scale(1.7)',  // Zoom effect for the logo
              transition: 'transform 0.3s ease'  // Smooth transition for zooming effect
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.3)'}  // Zoom in on hover
            onMouseLeave={(e) => e.target.style.transform = 'scale(1.2)'}  // Zoom out when hover ends
          />
          <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>GM Supply Chain Solutions</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontSize: '1.2rem' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services" style={{ fontSize: '1.2rem' }}>Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vision" style={{ fontSize: '1.2rem' }}>Vision</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" style={{ fontSize: '1.2rem' }}>Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/quote" style={{ fontSize: '1.2rem' }}>Get a Quote</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/setup" style={{ fontSize: '1.2rem' }}>Get Yourself Setup</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
