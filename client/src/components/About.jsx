import { React, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import styles from '../styles/AboutUs.module.css';

const About = () => {
      const [backgroundImage, setBackgroundImage] = useState('');
      useEffect(() => {
        const image = new Image();
        image.src = '/highway-lights.png';
        image.onload = () => {
          setBackgroundImage(`url('/highway-lights.png')`);
        };
      }, []);
  return (
    <div>
      <div className={styles.ourStoryWrapper} style={{ backgroundImage: backgroundImage, backgroundColor: '#2B2B2B' }}>
        <div className={styles.ourStoryCard} >
          <h2 className={styles.ourStoryTitle}>Our Story</h2>
          <p className={styles.ourStoryText}>
            At GM Supply Chain Solutions Inc., logistics isn’t just a business—it’s in our blood. Our founder, Amit Mittal, comes from a family that has been operating a successful trucking business in India since 1990. Growing up around freight, Amit developed a deep understanding of supply chain dynamics and the hard work it takes to move products efficiently.
          </p>
          <p className={styles.ourStoryText}>
            With a passion for logistics and a drive to expand beyond borders, Amit set his sights on Canada, determined to master every aspect of the industry. From track and trace to customs clearance, city dispatch to booking loads, asset-based operations to brokerage services—he has immersed himself in every role to understand the full logistics landscape.
          </p>
          <p className={styles.ourStoryText}>
            Over the years, Amit has gained hands-on experience in LTL (dry & reefer), FTL (dry & reefer), flatbed, heavy machinery hauling, and specialized freight services. His journey has been one of continuous learning, jumping from company to company to absorb the nuances of the business—from selling loads to bringing in customers, from working with carriers to building long-term partnerships.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.gridContainer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img src="/cross_border.png" alt="Our Vision" className={styles.image} />
          <div className={styles.textContainer}>
            <h2 className={styles.subtitle}>Our Vision</h2>
            <p className={styles.description}>
              The logistics industry is known for being highly competitive, sometimes even cutthroat—but we believe it doesn’t have to be that way. Amit’s vision for GM Supply Chain Solutions Inc. is simple:
            </p>
            <ul className={styles.list}>
              <li>
                <span className={styles.bullet}>✅</span>
                <div>
                  <strong>Honesty & Transparency</strong>
                  We believe in fair, open communication with both customers and carriers.
                </div>
              </li>
              <li>
                <span className={styles.bullet}>✅</span>
                <div>
                  <strong>Mutual Growth</strong>
                  When our clients and carriers succeed, we succeed. Our mission is to create an ecosystem where everyone thrives.
                </div>
              </li>
              <li>
                <span className={styles.bullet}>✅</span>
                <div>
                  <strong>Seamless Logistics</strong>
                  Whether by land, ocean, or air, we ensure smooth, efficient freight movement with top-tier service.
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
        <motion.div></motion.div>

        <motion.div
          className={styles.gridContainer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={styles.textContainer}>
            <h2 className={styles.subtitle}>Why Choose Us?</h2>
            <ul className={styles.list}>
              <li>
                <span className={styles.bullet}>🚛</span>
                <div>
                  <strong>Decades of Industry Knowledge</strong>
                  <span>A legacy in logistics, now expanding globally.</span>
                </div>
              </li>
              <li>
                <span className={styles.bullet}>📦</span>
                <div>
                  <strong>Multimodal Freight Solutions</strong>
                  <span>From LTL & FTL to heavy haul and reefer shipments.</span>
                </div>
              </li>
              <li>
                <span className={styles.bullet}>🌎</span>
                <div>
                  <strong>Comprehensive Expertise</strong>
                  <span>From tracking & dispatch to customs & brokerage services.</span>
                </div>
              </li>
              <li>
                <span className={styles.bullet}>🤝</span>
                <div>
                  <strong>A Team That Cares</strong>
                  <span>We’re not just here to move loads—we’re here to build lasting partnerships.</span>
                </div>
              </li>
            </ul>
          </div>
          <img src="/tracking.png" alt="Why Choose Us" className={styles.image} />
        </motion.div>

        <motion.div
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.subtitle}>Join the Dream Team</h2>
          <p className={styles.description}>
            Logistics is about more than just moving freight—it’s about trust, relationships, and growth. If you’re looking for a logistics partner that values honesty, reliability, and mutual success, you’ve come to the right place.
          </p>
          <p className={styles.description}>
            💡 Who’s ready to be part of the dream team? Hit "Get a Quote" and let’s start this beautiful journey together! 🚛🚢
          </p>
          <div className={styles.buttonDiv}>
            <Link to="/quote">
              Get a Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;