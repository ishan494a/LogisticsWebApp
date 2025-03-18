import React from 'react';
import { FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3" style={{ borderTop: '4px solid #c90000' }}>
      <div className="container">
        <div className="d-flex justify-content-center">
        <a href="tel:+14163884807" className="text-light mx-2">
            <FaPhoneAlt size={24} />
          </a>
          <a href="mailto:amitmittal495@gmail.com" className="text-light mx-2">
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
      <div className="mt-3">
        <p>&copy; 2025 GMSCS. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
