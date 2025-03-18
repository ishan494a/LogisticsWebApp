import React, { useState } from 'react';
import { Form, Button, Col, Row, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
const PLACES_API_KEY = import.meta.env.VITE_PLACES_API_KEY;
const EMAIL_API_KEY = import.meta.env.VITE_EMAIL_API_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
import emailjs from 'emailjs-com';


const GetQuotePage = () => {
  const [shipmentType, setShipmentType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [numberOfSkids, setNumberOfSkids] = useState('');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });
  const [dimUnit, setDimUnit] = useState('inches');
  const [differentDimensions, setDifferentDimensions] = useState(false);
  const [skidDimensions, setSkidDimensions] = useState([]);
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [commodity, setCommodity] = useState('');
  const [hazardous, setHazardous] = useState(false);
  const [equipmentType, setEquipmentType] = useState('');
  const [temperatureRequired, setTemperatureRequired] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('C');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [errors, setErrors] = useState([]);
  const [messageStatus, setMessageStatus] = useState(null);

  const handleAddMore = () => {
    alert("add more"); // Debugger
  }
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
      const message = `
        You have received a new quote request. Below are the details:

        - Name: ${name}
        - Email: ${email}
        - Shipment Type: ${shipmentType}
        - Pickup Address: ${pickupAddress.label}
        - Delivery Address: ${deliveryAddress.label}
        - Number of Skids: ${numberOfSkids}
        - Dimensions: ${dimensions.length}x${dimensions.width}x${dimensions.height} ${dimUnit}
        - Weight: ${weight} ${weightUnit}
        - Commodity: ${commodity}
        - Hazardous: ${hazardous ? 'Yes' : 'No'}
        - Equipment Type: ${equipmentType}
        - Temperature Required: ${temperatureRequired}
        - Special Requirements: ${specialRequirements}

        - Different Skid Dimensions:
          ${skidDimensions.map((dim, index) => `
            Skid ${index + 1}:
              - Length: ${dim.length} ${dimUnit}
              - Width: ${dim.width} ${dimUnit}
              - Height: ${dim.height} ${dimUnit}`).join('\n')}
        
        `;
      const params = {
        subject : "New Quote Request",
        message : message
      }
      emailjs.init(EMAIL_API_KEY);
      emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        params
      ).then(
        (result) => {
          setMessageStatus('success');
        },
        (error) => {
          setMessageStatus('error');
        }
      );
      setName('');
      setEmail('');
      setPhone('');
      setShipmentType('');
      setPickupAddress(null);
      setDeliveryAddress(null);  
      setNumberOfSkids('');
      setDimensions({ length: '', width: '', height: '' });
      setWeight('');
      setCommodity('');
      setHazardous(false);
      setEquipmentType('');
      setTemperatureRequired('');
      setSpecialRequirements('');
      setSkidDimensions([]);
    }
  };

  return (
    <div className="container mt-3" style={{paddingBottom: '2rem'}}>
      <h1 className="text-center display-4 mb-5">Get a Quote</h1>
      
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
          <Form.Group as={Col} controlId="formPhone">
            <Form.Label>Phone </Form.Label>
            <Form.Control 
              type="phone" 
              placeholder="Your Phone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
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
          <GooglePlacesAutocomplete
            apiKey={PLACES_API_KEY}
            selectProps={{
              value: pickupAddress,
              onChange: (value) => setPickupAddress(value),
              placeholder: "Start Typing...",
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formDeliveryAddress">
          <Form.Label>Delivery Address <span className="text-danger">*</span></Form.Label>
          <GooglePlacesAutocomplete
            apiKey={PLACES_API_KEY}
            selectProps={{
              value: deliveryAddress,
              onChange: (value) => setDeliveryAddress(value),
              placeholder: "Start Typing...",
            }}
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
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    label="inches"
                    name="dimUnits"
                    value="inches"
                    onChange={() => setDimUnit('inches')}
                    style={{paddingRight: '2rem'}}
                    defaultChecked
                  />
                  <Form.Check
                    type="radio"
                    label="cms"
                    name="dimUnits"
                    value="cms"
                    onChange={() => setDimUnit('cms')}
                  />
                </div>
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
                    <Form.Control
                      type="number"
                      placeholder='Number of Skids'
                    />
                  </div>
                    <Button variant="primary" onClick={handleAddMore}>
                      Add More
                    </Button>
                  </div>
                )}
              </Form.Group>
            </Row>
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
                label="Kgs"
                name="weightUnit"
                value="kgs"
                onChange={() => setWeightUnit('kgs')}
                style={{paddingRight: '2rem'}}
              />
              <Form.Check
                type="radio"
                label="Lbs"
                name="weightUnit"
                value="lbs"
                onChange={() => setWeightUnit('lbs')}
                defaultChecked
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
              <option value="Intermodal/Rail">Intermodal/Rail</option>
              <option value="straightTruck">Straight Truck</option>
              <option value="sprinter">Sprinter</option>
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

        {messageStatus === 'success' && (
          <Alert variant="success" className="mt-3">
            Your quote request has been sent successfully!
          </Alert>
        )}
        {messageStatus === 'error' && (
          <Alert variant="danger" className="mt-3">
            There was an error sending your quote request. Please try again.
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default GetQuotePage;
