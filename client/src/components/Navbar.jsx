import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = ({ logoSrc }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = () => {
    setIsCollapsed(true);
  };
  

  return (
    <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-dark bg-dark`}>
      <div className="container-fluid">
        <Link className={`${styles.navbarBrand} navbar-brand`} to="/">
          <img src={logoSrc} alt="Logo" className={`${styles.navbarLogo} me-2`} />
          <span>GM Supply Chain Solutions</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
          <ul className={`${styles.navbarLinks} navbar-nav ms-auto`}>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/services" onClick={handleLinkClick}>
                Services
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/quote" onClick={handleLinkClick}>
                Get a Quote
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/setup" onClick={handleLinkClick}>
                Get Yourself Setup
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/contact" onClick={handleLinkClick}>
                Contact Us
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/about" onClick={handleLinkClick}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
