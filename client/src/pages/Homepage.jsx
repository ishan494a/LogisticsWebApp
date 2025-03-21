import { React, useEffect, useState } from 'react';
import About from '../components/About';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Homepage.module.css';
import { FaTruck, FaShippingFast, FaClock, FaCogs } from 'react-icons/fa';

function Homepage() {
  const [backgroundImage, setBackgroundImage] = useState('');
  useEffect(() => {
    const image = new Image();
    image.src = '/highway-night.png';
    image.onload = () => {
      setBackgroundImage(`url('/highway-night.png')`);
    };
  }, []);
  return (
    <div>
      <div
        className={`${styles.heroSection} text-center text-white py-5`}
        style={{ backgroundImage : backgroundImage }}
      >
        <div className={styles.blurredCard}>
          <h1 className={styles.cardTitle}>Your Trusted Partner in Logistics</h1>
          <p className="lead">
            Delivering seamless freight solutions across land, sea, and air.
          </p>
          <div className={styles.buttonDiv}>
            <Link to="/quote">
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h1 className="text-center mb-3">Our Core Services</h1>
        <h5 className="text-center mb-5">
          Tailored solutions for all your logistics needs.
        </h5>
        <div className="row">
          <div className="col-md-3 text-center">
            <FaTruck className={`mb-3 ${styles.serviceIcon}`} size={50} />
            <h4>Freight Brokerage</h4>
            <p>Connecting shippers with reliable carriers.</p>
          </div>
          <div className="col-md-3 text-center">
            <FaShippingFast className={`mb-3 ${styles.serviceIcon}`} size={50} />
            <h4>Full Truckload (FTL)</h4>
            <p>Efficient solutions for large shipments.</p>
          </div>
          <div className="col-md-3 text-center">
            <FaClock className={`mb-3 ${styles.serviceIcon}`} size={50} />
            <h4>Expedited Freight</h4>
            <p>Fast and reliable time-critical shipments.</p>
          </div>
          <div className="col-md-3 text-center">
            <FaCogs className={`mb-3 ${styles.serviceIcon}`} size={50} />
            <h4>Supply Chain Consulting</h4>
            <p>Optimize your logistics strategy.</p>
          </div>
        </div>
        <div className="text-center">
          <div className={styles.buttonDiv}>
            <Link to="/services">
              View All &gt;&gt;
            </Link>
          </div>
        </div>
      </div>
      {/* About us section */}
      <About/>
    </div>
  );
}

export default Homepage;