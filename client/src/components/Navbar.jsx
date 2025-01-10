import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import the CSS module

const Navbar = ({ logoSrc }) => {
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
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className={`${styles.navbarLinks} navbar-nav ms-auto`}>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/">Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/services">Services</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/vision">Vision</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/contact">Contact Us</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/quote">Get a Quote</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} nav-link`} to="/setup">Get Yourself Setup</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
