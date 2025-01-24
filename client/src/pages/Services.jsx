import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Services.module.css';

const services = [
  {
    title: 'Freight Brokerage Services',
    description:
      'We connect shippers with reliable carriers, ensuring that your goods are transported efficiently and on time. With a vast network of trusted carriers and cutting-edge technology, we guarantee competitive pricing and seamless communication from pickup to delivery.',
    image: '/expedited.png', 
  },
  {
    title: 'Full Truckload (FTL) Shipping',
    description:
      'Have a large shipment? We specialize in securing capacity for full truckload shipments across the country. Whether it’s dry van, flatbed, or refrigerated freight, we’ve got you covered.',
    image: '/expedited.png', 
  },
  {
    title: 'Less Than Truckload (LTL) Shipping',
    description:
      'For smaller shipments, our LTL solutions help you save money while ensuring your freight reaches its destination safely. We’ll consolidate your shipment with others to optimize cost and efficiency.',
    image: '/expedited.png',
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
    image: '/expedited.png',
  },
  {
    title: 'Intermodal Transportation',
    description:
      'Combine the efficiency of rail with the flexibility of trucking to reduce costs and carbon emissions. Our intermodal solutions are a smart way to move your freight over long distances.',
    image: '/expedited.png',
  },
  {
    title: 'Supply Chain Consulting',
    description:
      'Optimize your logistics strategy with our expert guidance. From improving routing efficiency to reducing costs, we’ll work with you to streamline your supply chain operations.',
    image: '/expedited.png', 
  },
];

const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); 
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center display-4 mb-5">Our Services</h1>
      {services.map((service, index) => (
        <div key={index} className={styles.serviceCard}>
          <div onClick={() => handleToggle(index)} className={styles.serviceTitle}>
            <span className={styles.serviceTitleText}>{service.title}</span>
            <i
              className={`fa fa-chevron-down ${openIndex === index ? styles.rotate180 : ''}`}
              style={{ fontSize: '20px' }}
            ></i>
          </div>
          <div
            className={`${styles.serviceDescription} ${openIndex === index ? styles.open : ''}`}
          >
            <div className={styles.serviceContent}>
              <img
                src={service.image}
                alt={service.title}
                className={styles.serviceImage}
              />
              <p>{service.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
