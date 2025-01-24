import React, { useState } from 'react';
import { Form, Button, Col, Row, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import emailjs from 'emailjs-com';

const EMAIL_API_KEY = import.meta.env.VITE_EMAIL_API_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;

const GetSetupPage = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [yearsInBusiness, setYearsInBusiness] = useState('');
  const [mcNumber, setMcNumber] = useState('');
  const [lanesServiced, setLanesServiced] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [bankDetails, setBankDetails] = useState({
    name: '',
    accountNumber: '',
    transitNumber: '',
    instituteNumber: ''
  });
  const [carrierPackage, setCarrierPackage] = useState('');
  const [insurance, setInsurance] = useState('');
  const [references, setReferences] = useState([
    { companyName: '', personName: '', phoneNumber: '' },
    { companyName: '', personName: '', phoneNumber: '' },
    { companyName: '', personName: '', phoneNumber: '' }
  ]);
  const [errors, setErrors] = useState([]);
  const [messageStatus, setMessageStatus] = useState(null);

  const validateForm = () => {
    const newErrors = [];
    if (!name) newErrors.push('Name');
    if (!contactNumber) newErrors.push('Contact Number');
    if (!email) newErrors.push('Email');
    if (!yearsInBusiness) newErrors.push('Years in Business');
    if (!mcNumber) newErrors.push('MC Number');
    if (!lanesServiced) newErrors.push('Lanes you service');
    if (!equipmentType) newErrors.push('Type of Equipment');
    if (!bankDetails.name || !bankDetails.accountNumber || !bankDetails.transitNumber || !bankDetails.instituteNumber) {
      newErrors.push('Bank Details');
    }
    if (!carrierPackage) newErrors.push('Carrier Package');
    if (!insurance) newErrors.push('Insurance');
    references.forEach((ref, index) => {
      if (!ref.companyName || !ref.personName || !ref.phoneNumber) {
        newErrors.push(`Reference ${index + 1}`);
      }
    });
    
    setErrors(newErrors);

    if (newErrors.length > 0) {
      window.scrollTo(0, 0);
    }

    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const message = `
        You have received a new carrier partner setup request. Below are the details:
        
        - Name: ${name}
        - Contact Number: ${contactNumber}
        - Email: ${email}
        - Years in Business: ${yearsInBusiness}
        - MC Number: ${mcNumber}
        - Lanes you service: ${lanesServiced}
        - Type of Equipment: ${equipmentType}
        - Carrier Package: ${carrierPackage}
        - Insurance: ${insurance}
        
        Bank Details:
        - Name: ${bankDetails.name}
        - Account Number: ${bankDetails.accountNumber}
        - Transit Number: ${bankDetails.transitNumber}
        - Institute Number: ${bankDetails.instituteNumber}
        
        References:
        1) Company Name: ${references[0].companyName}, Person Name: ${references[0].personName}, Phone Number: ${references[0].phoneNumber}
        2) Company Name: ${references[1].companyName}, Person Name: ${references[1].personName}, Phone Number: ${references[1].phoneNumber}
        3) Company Name: ${references[2].companyName}, Person Name: ${references[2].personName}, Phone Number: ${references[2].phoneNumber}
      `;
      
      const params = {
        subject: "New Carrier Setup Request",
        message: message,
      };
      
      emailjs.init(EMAIL_API_KEY);
      emailjs.send(SERVICE_ID, TEMPLATE_ID, params).then(
        () => {
          setMessageStatus('success');
        },
        (error) => {
          setMessageStatus('error');
        }
      );
      
      // Reset form fields
      setName('');
      setContactNumber('');
      setEmail('');
      setYearsInBusiness('');
      setMcNumber('');
      setLanesServiced('');
      setEquipmentType('');
      setBankDetails({ name: '', accountNumber: '', transitNumber: '', instituteNumber: '' });
      setCarrierPackage('');
      setInsurance('');
      setReferences([{ companyName: '', personName: '', phoneNumber: '' }, { companyName: '', personName: '', phoneNumber: '' }, { companyName: '', personName: '', phoneNumber: '' }]);
    }
  };

  return (
    <div className="container mt-3" style={{ paddingBottom: '2rem' }}>
      <h1 className="text-center display-4 mb-5">Carrier Setup</h1>
      
      {errors.length > 0 && (
        <Alert variant="danger">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error} is required.</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              required
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formContactNumber">
            <Form.Label>Contact Number <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              required
              type="text"
              placeholder="Your Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formEmail">
            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              required
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formYearsInBusiness">
            <Form.Label>Number of Years in Business <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              required
              type="number"
              placeholder="Years in Business"
              value={yearsInBusiness}
              onChange={(e) => setYearsInBusiness(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formMcNumber">
            <Form.Label>MC Number <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              required
              type="text"
              placeholder="MC Number"
              value={mcNumber}
              onChange={(e) => setMcNumber(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formLanesServiced">
            <Form.Label>Lanes You Service <span className="text-danger">*</span></Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Lanes You Service"
              value={lanesServiced}
              onChange={(e) => setLanesServiced(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formEquipmentType">
            <Form.Label>Type of Equipment <span className="text-danger">*</span></Form.Label>
            <Form.Control
              required
              as="select"
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value)}
            >
              <option value="">Select Equipment</option>
              <option value="Dry Van">Dry Van</option>
              <option value="Refrigerated">Refrigerated</option>
              <option value="Flatbed">Flatbed</option>
              <option value="Low Boy">Low Boy</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBankDetails">
            <Form.Label>Bank Details <span className="text-danger">*</span></Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              value={bankDetails.name}
              onChange={(e) => setBankDetails({ ...bankDetails, name: e.target.value })}
            />
            <Form.Control
              required
              type="text"
              placeholder="Account Number"
              value={bankDetails.accountNumber}
              onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
            />
            <Form.Control
              required
              type="text"
              placeholder="Transit Number"
              value={bankDetails.transitNumber}
              onChange={(e) => setBankDetails({ ...bankDetails, transitNumber: e.target.value })}
            />
            <Form.Control
              required
              type="text"
              placeholder="Institute Number"
              value={bankDetails.instituteNumber}
              onChange={(e) => setBankDetails({ ...bankDetails, instituteNumber: e.target.value })}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCarrierPackage">
            <Form.Label>Carrier Package <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              required
              type="text"
              placeholder="Carrier Package"
              value={carrierPackage}
              onChange={(e) => setCarrierPackage(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formInsurance">
            <Form.Label>Insurance <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              required
              type="text"
              placeholder="Insurance"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          {references.map((reference, index) => (
            <div key={index} className="mb-3">
              <h5>Reference {index + 1}</h5>
              <Form.Group as={Col} controlId={`formReferenceCompanyName${index}`}>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company Name"
                  value={reference.companyName}
                  onChange={(e) => {
                    const updatedReferences = [...references];
                    updatedReferences[index].companyName = e.target.value;
                    setReferences(updatedReferences);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`formReferencePersonName${index}`}>
                <Form.Label>Person Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Person Name"
                  value={reference.personName}
                  onChange={(e) => {
                    const updatedReferences = [...references];
                    updatedReferences[index].personName = e.target.value;
                    setReferences(updatedReferences);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`formReferencePhoneNumber${index}`}>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  value={reference.phoneNumber}
                  onChange={(e) => {
                    const updatedReferences = [...references];
                    updatedReferences[index].phoneNumber = e.target.value;
                    setReferences(updatedReferences);
                  }}
                />
              </Form.Group>
            </div>
          ))}
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {messageStatus && (
        <Modal show={true} onHide={() => setMessageStatus(null)}>
          <Modal.Header closeButton>
            <Modal.Title>{messageStatus === 'success' ? 'Success' : 'Error'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {messageStatus === 'success' ? 'Your form has been successfully submitted!' : 'There was an error submitting your form. Please try again.'}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default GetSetupPage;
