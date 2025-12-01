import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function DismissibleExample({ obj }) {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  

  return (
    <Row>
      <Col md={6} className="mb-2">
        <Button onClick={toggleShowA} className="mb-2">
          About <strong>this</strong> tape
        </Button>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
          </Toast.Header>
          <Toast.Body>{obj.description}</Toast.Body>
          {obj.map((o) => 
          (
            <Toast.Body>Genre: {o.tapeGenres.name}</Toast.Body>
          ))}
          <Toast.Body>Released on VHS: {obj.year}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default DismissibleExample;
