import React from 'react';
import About from '../components/About';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Homepage.module.css';

function Homepage() {
  return (
    <div>
      <div
        className={`${styles.heroSection} text-center text-white py-5`}
        style={{ backgroundImage: `url(/expedited.png)` }}
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
            <img
              src="/expedited.png"
              alt="Freight Brokerage"
              className={`img-fluid mb-3 ${styles.serviceIcon}`}
            />
            <h4>Freight Brokerage</h4>
            <p>Connecting shippers with reliable carriers.</p>
          </div>
          <div className="col-md-3 text-center">
            <img
              src="/expedited.png"
              alt="FTL Shipping"
              className={`img-fluid mb-3 ${styles.serviceIcon}`}
            />
            <h4>Full Truckload (FTL)</h4>
            <p>Efficient solutions for large shipments.</p>
          </div>
          <div className="col-md-3 text-center">
            <img
              src="/expedited.png"
              alt="Expedited Freight"
              className={`img-fluid mb-3 ${styles.serviceIcon}`}
            />
            <h4>Expedited Freight</h4>
            <p>Fast and reliable time-critical shipments.</p>
          </div>
          <div className="col-md-3 text-center">
            <img
              src="/expedited.png"
              alt="Supply Chain Consulting"
              className={`img-fluid mb-3 ${styles.serviceIcon}`}
            />
            <h4>Supply Chain Consulting</h4>
            <p>Optimize your logistics strategy.</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <About />
    </div>
  );
}

export default Homepage;