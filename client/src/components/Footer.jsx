import React from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import both LinkedIn and Gmail icons

const Footer = () => {
  return (
    <footer
      className="bg-dark text-light text-center py-3"
      style={{borderTop: '4px solid #c90000' }}
    >
      <div>
        <p>Website design by <strong>Ishan Jain</strong></p>
        <p>
          <a
            href="https://www.linkedin.com/in/ishanjain2000"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ddd', textDecoration: 'none', marginRight: '20px' }}
          >
            <FaLinkedin size={30} color="#c90000" />
          </a>
          <a
            href="mailto:ishanjain2000@gmail.com"
            style={{ color: '#ddd', textDecoration: 'none' }}
          >
            <FaEnvelope size={30} color="#c90000" />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
