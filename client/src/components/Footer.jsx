import React from 'react';
import { FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3" style={{ borderTop: '4px solid #c90000' }}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="m-3">
            <h4>Contact Us</h4>
            <p><FaMapMarkerAlt /> <a href="https://www.google.com/maps?q=4+Wild+Indigo+Crescent,+Brampton,+ON" target="_blank" className="text-light">4 Wild Indigo Crescent, Brampton, ON</a></p>
          </div>
        </div>
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
