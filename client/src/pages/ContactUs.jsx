import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import styles from '../styles/ContactUs.module.css';

const EMAIL_API_KEY = import.meta.env.VITE_EMAIL_API_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const TEMPLATE_ID_CONTACT = import.meta.env.VITE_EMAIL_TEMPLATE_ID_CONTACT;

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState(null);
  const [errors, setErrors] = useState([]);

  const validateForm = () => {
    const newErrors = [];
    if (!name) newErrors.push('Name');
    if (!email) newErrors.push('Email');
    if (!phone) newErrors.push('Phone');
    if (!message) newErrors.push('Message');
    
    setErrors(newErrors);
    
    if (newErrors.length > 0) {
      window.scrollTo(0, 0);
    }

    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let params = {
        name: name,
        email: email,
        phone: phone,
        message: message,
      };
      emailjs.init(EMAIL_API_KEY);
      emailjs.send(SERVICE_ID, TEMPLATE_ID_CONTACT, params)
        .then(
          () => {
            setMessageStatus('success');
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setTimeout(() => setMessageStatus(null), 5000);
          },
          () => {
            setMessageStatus('error');
            setTimeout(() => setMessageStatus(null), 5000);
          }
        );
    }
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center display-4 mb-5">Contact Us</h1>

      {errors.length > 0 && (
        <Alert variant="danger" className={styles.alert}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error} is required.</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className={styles.formGroup}>
          <Form.Label>Name <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.formControl}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className={styles.formGroup}>
          <Form.Label>Email <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formControl}
          />
        </Form.Group>

        <Form.Group controlId="formPhone" className={styles.formGroup}>
          <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.formControl}
          />
        </Form.Group>

        <Form.Group controlId="formMessage" className={styles.formGroup}>
          <Form.Label>Message <span className="text-danger">*</span></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.formControl}
          />
        </Form.Group>

        <div className="text-center" style={{ paddingBottom: '1rem' }}>
          <Button variant="primary" type="submit" className={styles.button}>Send Message</Button>
        </div>
      </Form>

      {messageStatus === 'success' && (
        <Alert variant="success" className={styles.alert}>
          Your message has been sent successfully!
        </Alert>
      )}
      {messageStatus === 'error' && (
        <Alert variant="danger" className={styles.alert}>
          There was an error sending your message. Please try again.
        </Alert>
      )}

      <div className="mt-7" style={{ paddingBottom: '1rem' }}>
        <Row>
          <Col md={4}>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title><FaEnvelope /> Email Us</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> support@example.com
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title><FaPhoneAlt /> Call Us</Card.Title>
                <Card.Text>
                  <strong>Phone:</strong> (123) 456-7890
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title><FaMapMarkerAlt /> Visit Us</Card.Title>
                <Card.Text>
                  <strong>Address:</strong> 123 Business Street, City, Country
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUsPage;
