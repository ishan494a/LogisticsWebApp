import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Modal, Alert } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
    setSkidDimensions([...skidDimensions, { length: '', width: '', height: '', quantity: '' }]);
  }

  const handleDeleteRow = (index) => {
    const updatedSkids = skidDimensions.filter((_, i) => i !== index);
    setSkidDimensions(updatedSkids);
  };
  
  const handleSkidChange = (index, field, value) => {
    const updatedSkids = [...skidDimensions];
    updatedSkids[index][field] = value;
    setSkidDimensions(updatedSkids);
  };

  useEffect(() => {
    if (differentDimensions && skidDimensions.length === 0) {
      handleAddMore();
    }
  }, [differentDimensions]);  

  const validateForm = () => {
    const newErrors = [];
    if (shipmentType === 'LTL' && differentDimensions) {
      const totalSkidQuantity = skidDimensions.reduce((sum, dim) => {
        const qty = parseInt(dim.quantity) || 0;
        return sum + qty;
      }, 0);
      const expectedQuantity = parseInt(numberOfSkids) || 0;
  
      if (totalSkidQuantity !== expectedQuantity) {
        newErrors.push('Individual Skid quantities must add up to Total Skid Quantity');
      }
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
        - Pickup Address: ${pickupAddress}
        - Delivery Address: ${deliveryAddress}
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
            Skid${index + 1} x ${dim.quantity}:
              - Length: ${dim.length} ${dimUnit}
              - Width: ${dim.width} ${dimUnit}
              - Height: ${dim.height} ${dimUnit}`).join('\n')}
        
        `;
      console.log(message);
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
      setPickupAddress('');
      setDeliveryAddress('');  
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
              <li key={index}>{error}</li>
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
                required
                type="radio"
                label="LTL"
                name="shipmentType"
                value="LTL"
                onChange={() => setShipmentType('LTL')}
                style={{paddingRight: '2rem'}}
              />
              <Form.Check
                required
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
            type="pickupaddress" 
            placeholder="Pickup Address" 
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)} 
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formDeliveryAddress">
          <Form.Label>Delivery Address <span className="text-danger">*</span></Form.Label>
          <Form.Control
            required
            type="deliveryaddress" 
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
                      required
                      type="number"
                      placeholder="L"
                      value={dimensions.length}
                      onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                    />
                    <Form.Control 
                      required
                      type="number"
                      placeholder="W"
                      value={dimensions.width}
                      onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    />
                    <Form.Control 
                      required
                      type="number"
                      placeholder="H"
                      value={dimensions.height}
                      onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                    />
                    
                  </div>
                )}

                {differentDimensions && (
                  <div className="mb-3">
                    {skidDimensions.map((skid, index) => (
                      <div key={index} className="d-flex mb-2 gap-2 align-items-center">
                        <Form.Control
                          required
                          type="number"
                          placeholder="L"
                          value={skid.length}
                          onChange={(e) => handleSkidChange(index, 'length', e.target.value)}
                        />
                        <Form.Control
                          required
                          type="number"
                          placeholder="W"
                          value={skid.width}
                          onChange={(e) => handleSkidChange(index, 'width', e.target.value)}
                        />
                        <Form.Control
                          required
                          type="number"
                          placeholder="H"
                          value={skid.height}
                          onChange={(e) => handleSkidChange(index, 'height', e.target.value)}
                        />
                        <Form.Control
                          required
                          type="number"
                          placeholder="Number of Skids"
                          value={skid.quantity}
                          onChange={(e) => handleSkidChange(index, 'quantity', e.target.value)}
                        />

                        <div style={{ width: '80px' }}>
                          {index > 0 ? (
                             <Button variant="outline-danger" size="sm" onClick={() => handleDeleteRow(index)}>
                             <FaTrash />
                           </Button>
                          ) : (
                            <div style={{ visibility: 'hidden' }}>
                               <Button variant="outline-danger" size="sm" onClick={() => handleDeleteRow(index)}>
                                <FaTrash />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

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
