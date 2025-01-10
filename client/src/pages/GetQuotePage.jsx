import React, { useState } from 'react';
import { Form, Button, Col, Row, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const GetQuotePage = () => {
  const [shipmentType, setShipmentType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [numberOfSkids, setNumberOfSkids] = useState('');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });
  const [differentDimensions, setDifferentDimensions] = useState(false);
  const [skidDimensions, setSkidDimensions] = useState([]);
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [commodity, setCommodity] = useState('');
  const [hazardous, setHazardous] = useState(false);
  const [equipmentType, setEquipmentType] = useState('');
  const [temperatureRequired, setTemperatureRequired] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('C');
  const [specialRequirements, setSpecialRequirements] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    const initialSkidDimensions = Array.from({ length: numberOfSkids }).map(() => ({
      length: '',
      width: '',
      height: ''
    }));
    setSkidDimensions(initialSkidDimensions);
    setShowModal(true);
  };

  const handleSkidChange = (index, dimension, value) => {
    const updatedSkids = [...skidDimensions];
    if (!updatedSkids[index]) {
      updatedSkids[index] = {};
    }
    updatedSkids[index][dimension] = value;
    setSkidDimensions(updatedSkids);
  };

  const validateForm = () => {
    const newErrors = [];
    
    if (!name) newErrors.push('Name');
    if (!email) newErrors.push('Email');
    if (!shipmentType) newErrors.push('Type of Shipment');
    if (!pickupAddress) newErrors.push('Pickup Address');
    if (!deliveryAddress) newErrors.push('Delivery Address');
    if (!numberOfSkids) newErrors.push('Number of Skids');
    if (!weight) newErrors.push('Weight');
    if (!commodity && !hazardous) newErrors.push('Commodity or Hazardous');
    if (!equipmentType) newErrors.push('Type of Equipment');
    if (equipmentType === 'refer' && !temperatureRequired) newErrors.push('Temperature Required');
    
    if (shipmentType === 'LTL' && !differentDimensions && (!dimensions.length || !dimensions.width || !dimensions.height)) {
      newErrors.push('Dimensions (L x W x H)');
    }
    
    if (shipmentType === 'LTL' && differentDimensions && skidDimensions.some(skid => !skid.length || !skid.width || !skid.height)) {
      newErrors.push('Dimensions for each skid');
    }
    
    setErrors(newErrors);

    if (newErrors.length > 0) {
      window.scrollTo(0, 0);
    }

    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const emailBody = `
        You have received a new quote request. Below are the details:

        - **Name**: ${name}
        - **Email**: ${email}
        - **Shipment Type**: ${shipmentType}
        - **Pickup Address**: ${pickupAddress}
        - **Delivery Address**: ${deliveryAddress}
        - **Number of Skids**: ${numberOfSkids}
        - **Dimensions**: ${dimensions}
        - **Weight**: ${weight} ${weightUnit}
        - **Commodity**: ${commodity}
        - **Hazardous**: ${hazardous ? 'Yes' : 'No'}
        - **Equipment Type**: ${equipmentType}
        - **Temperature Required**: ${temperatureRequired}
        - **Special Requirements**: ${specialRequirements}

        - **Skid Dimensions**:
          ${skidDimensions.map((dim, index) => `
            Skid ${index + 1}:
              - Length: ${dim.length}
              - Width: ${dim.width}
              - Height: ${dim.height}`).join('\n')}
        
        `;

      console.log(emailBody);
    }
  };

  return (
    <div className="container mt-4" style={{paddingBottom: '2rem'}}>
      <h1 className="text-center">Get a Quote</h1>
      
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
          <Form.Group as={Col} controlId="formShipmentType">
            <Form.Label>Type of Shipment <span className="text-danger">*</span></Form.Label>
            <div className="d-flex">
              <Form.Check
                type="radio"
                label="LTL"
                name="shipmentType"
                value="LTL"
                onChange={() => setShipmentType('LTL')}
                style={{paddingRight: '2rem'}}
              />
              <Form.Check
                type="radio"
                label="FTL"
                name="shipmentType"
                value="FTL"
                onChange={() => setShipmentType('FTL')}
              />
            </div>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPickupAddress">
            <Form.Label>Pickup Address <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              required
              type="text"
              placeholder="Pickup Address"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formDeliveryAddress">
            <Form.Label>Delivery Address <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              required
              type="text"
              placeholder="Delivery Address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formNumberOfSkids">
            <Form.Label>Number of Skids <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              required 
              type="number" 
              placeholder="Number of Skids"
              value={numberOfSkids}
              onChange={(e) => setNumberOfSkids(e.target.value)}
            />
          </Form.Group>
        </Row>

        {shipmentType === 'LTL' && (
          <>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formDimensions">
                <Form.Label>Dimensions (L x W x H) <span className="text-danger">*</span></Form.Label>
                <Form.Group as={Col} controlId="formDifferentDimensions">
                  <Form.Check
                    type="checkbox"
                    label="Different Dimensions for Each Skid"
                    onChange={() => setDifferentDimensions(!differentDimensions)}
                  />
                </Form.Group>

                {!differentDimensions && (
                  <div className="d-flex">
                    <Form.Control 
                      type="number"
                      placeholder="L"
                      value={dimensions.length}
                      onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                    />
                    <Form.Control 
                      type="number"
                      placeholder="W"
                      value={dimensions.width}
                      onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    />
                    <Form.Control 
                      type="number"
                      placeholder="H"
                      value={dimensions.height}
                      onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                    />
                  </div>
                )}

                {differentDimensions && (
                  <div className="mb-3">
                    <Button variant="primary" onClick={handleShowModal}>
                      Set Dimensions for Each Skid
                    </Button>
                  </div>
                )}
              </Form.Group>
            </Row>

            {differentDimensions && (
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Enter Dimensions for Each Skid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {Array.from({ length: numberOfSkids }).map((_, index) => (
                    <div key={index}>
                      <h5>Skid {index + 1}</h5>
                      <div className="d-flex mb-3">
                        <Form.Control
                          type="number"
                          placeholder="L"
                          value={skidDimensions[index]?.length || ''}
                          onChange={(e) => handleSkidChange(index, 'length', e.target.value)}
                        />
                        <Form.Control
                          type="number"
                          placeholder="W"
                          value={skidDimensions[index]?.width || ''}
                          onChange={(e) => handleSkidChange(index, 'width', e.target.value)}
                        />
                        <Form.Control
                          type="number"
                          placeholder="H"
                          value={skidDimensions[index]?.height || ''}
                          onChange={(e) => handleSkidChange(index, 'height', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  <Button variant="primary" onClick={handleCloseModal}>Save</Button>
                </Modal.Footer>
              </Modal>
            )}
          </>
        )}

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formWeight">
            <Form.Label>Weight <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              required 
              type="number" 
              placeholder="Weight" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formWeightUnit">
            <Form.Label>Weight Unit <span className="text-danger">*</span></Form.Label>
            <div className="d-flex">
              <Form.Check
                type="radio"
                label="Kg"
                name="weightUnit"
                value="kg"
                onChange={() => setWeightUnit('kg')}
                style={{paddingRight: '2rem'}}
              />
              <Form.Check
                type="radio"
                label="Lbs"
                name="weightUnit"
                value="lbs"
                onChange={() => setWeightUnit('lbs')}
              />
            </div>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCommodity">
            <Form.Label>Commodity</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Commodity"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formHazardous">
            <Form.Check
              type="checkbox"
              label="Hazardous?"
              onChange={() => setHazardous(!hazardous)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formEquipmentType">
            <Form.Label>Type of Equipment <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              as="select"
              required
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value)}
            >
              <option value="">Select Equipment</option>
              <option value="dryVan">Dry van</option>
              <option value="refer">Refrigerated (Temp)</option>
              <option value="flatbed">Flatbed</option>
              <option value="rollTite">Roll-tite</option>
              <option value="lowBoy">Low boy</option>
              <option value="rgn">RGN</option>
            </Form.Control>
          </Form.Group>
        </Row>

        {equipmentType === 'refer' && (
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formTemperatureRequired">
              <Form.Label>Temperature Required <span className="text-danger">*</span></Form.Label>
              <div className="d-flex">
                <Form.Control 
                  required 
                  type="number" 
                  placeholder="Temperature" 
                  value={temperatureRequired}
                  onChange={(e) => setTemperatureRequired(e.target.value)}
                />
                <Form.Control
                  as="select"
                  value={temperatureUnit}
                  onChange={(e) => setTemperatureUnit(e.target.value)}
                  style={{ marginLeft: '1rem' }}
                >
                  <option value="C">°C</option>
                  <option value="F">°F</option>
                </Form.Control>
              </div>
            </Form.Group>
          </Row>
        )}

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formSpecialRequirements">
            <Form.Label>Special Requirements</Form.Label>
            <Form.Control 
              as="textarea" 
              placeholder="Any special requirements?"
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
            />
          </Form.Group>
        </Row>

        <div className="text-center">
          <Button variant="primary" type="submit">Get Quote</Button>
        </div>
      </Form>
    </div>
  );
};

export default GetQuotePage;
