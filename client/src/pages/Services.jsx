import { React, useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Services.module.css';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    title: 'Freight Brokerage Services',
    description:
      'We connect shippers with reliable carriers, ensuring that your goods are transported efficiently and on time. With a vast network of trusted carriers and cutting-edge technology, we guarantee competitive pricing and seamless communication from pickup to delivery.',
    image: '/freight_broker.png',
  },
  {
    title: 'Full Truckload (FTL) Shipping',
    description:
      'Have a large shipment? We specialize in securing capacity for full truckload shipments across the country. Whether it’s dry van, flatbed, or refrigerated freight, we’ve got you covered.',
    image: '/truckload.png',
  },
  {
    title: 'Less Than Truckload (LTL) Shipping',
    description:
      'For smaller shipments, our LTL solutions help you save money while ensuring your freight reaches its destination safely. We’ll consolidate your shipment with others to optimize cost and efficiency.',
    image: '/LTL.png',
  },
  {
    title: 'Expedited Freight Services',
    description:
      'Need it there fast? Our expedited freight services ensure that time-critical shipments arrive on schedule. Whether by ground or air, we prioritize speed without compromising reliability.',
    image: '/expedited.png',
  },
  {
    title: 'Dedicated Lane Management',
    description:
      'Looking for consistency and reliability? We offer dedicated lane management solutions that provide stable pricing, guaranteed capacity, and enhanced supply chain visibility.',
    image: '/dedicated_lanes.png',
  },
  {
    title: 'Intermodal Transportation',
    description:
      'Combine the efficiency of rail with the flexibility of trucking to reduce costs and carbon emissions. Our intermodal solutions are a smart way to move your freight over long distances.',
    image: '/intermodal_transportation.png',
  },
  {
    title: 'Supply Chain Consulting',
    description:
      'Optimize your logistics strategy with our expert guidance. From improving routing efficiency to reducing costs, we’ll work with you to streamline your supply chain operations.',
    image: '/supply_chain_consulting.png',
  },
];

const ServiceItem = ({ service, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    hidden: { opacity: 0, y: 50 },
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`${styles.serviceItem} ${isEven ? styles.even : styles.odd}`}
    >
      <div className={styles.serviceContent}>
        <img src={service.image} alt={service.title} className={styles.serviceImage} />
        <div className={styles.serviceText}>
          <h3 className={styles.serviceTitle}>{service.title}</h3>
          <p className={styles.serviceDescription}>{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
    const [backgroundImage, setBackgroundImage] = useState('');
    useEffect(() => {
      const image = new Image();
      image.src = '/highway-truck.png';
      image.onload = () => {
        setBackgroundImage(`url('/highway-truck.png')`);
      };
    }, []);
  return (
    <div>
      <div className={styles.serviceImageWrapper} style={{ 
        width: '100%',
        height: '50vh',
        overflow: 'hidden',
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center 80%',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Our Services</h2>
          <p className={styles.cardText}>
          At GM Supply Chain Solutions, we offer a wide range of logistics solutions designed to meet the unique needs of each client. Our services are tailored to ensure timely deliveries, cost efficiency, and seamless communication, helping businesses move goods across the country with ease and reliability.
          </p>
          <div className={styles.buttonDiv}>
            <Link to="/quote">REQUEST A QUOTE</Link>
          </div>
        </div>
      </div>
      <div className={styles.servicesContainer}>
        {services.map((service, index) => (
          <ServiceItem key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Services;