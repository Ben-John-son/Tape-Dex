// import React, { useState } from 'react';
// import {
//   Card,
//   CardBody,
//   CardImg,
//   CardTitle,
//   CardText,
//   Button, Col, Row, Toast
// } from "reactstrap";







// export default function TapeCard({ tapeObj }) {

//   const [showA, setShowA] = useState(true);
  
//     const toggleShowA = () => setShowA(!showA);

//   return (
//     <Card style={{ width: "18rem" }}>
//       <CardImg className="cardImage" top src={tapeObj.photo} />
//       <CardBody>
//         <CardTitle tag="h5">{tapeObj.title}</CardTitle>
//         <CardText>{tapeObj.description}</CardText>
//         <Button color="primary" onClick={toggleShowA}>Go somewhere</Button>
//         <Row>
//               <Col md={6} className="mb-2">
//                 <Button onClick={toggleShowA} className="mb-2">
//                   About <strong>this</strong> tape
//                 </Button>
//                 <Toast show={showA} onClose={toggleShowA}>
//                   <Toast.Header>
//                   </Toast.Header>
//                   <Toast.Body>{tapeObj.description}</Toast.Body>
                 
//                   <Toast.Body>Released on VHS: {tapeObj.year}</Toast.Body>
//                 </Toast>
//               </Col>
//             </Row>
//       </CardBody>
//     </Card>
//   );
// }



import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
  Col,
  Row,
  Collapse
} from "reactstrap";

export default function TapeCard({ tapeObj }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <Card style={{ width: "18rem" }}>
      <CardImg className="cardImage" top src={tapeObj.photo} />
      <CardBody>
        <CardTitle tag="h5">{tapeObj.title}</CardTitle>
        <Row>
          <Col md={12} className="mb-2">
            <Button color="primary" onClick={toggleDetails}>
              {showDetails ? "Hide Details" : "About"}
            </Button>

            <Collapse isOpen={showDetails}>
              <div className="mt-2 p-2 border rounded" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
                <p>{tapeObj.description}</p>
                <p>Released on VHS: {tapeObj.year}</p>
                {tapeObj.tapeGenres.map((o) =>
                (
                  <p>Genre: {o.genre.name}</p>
                ))}
              </div>
            </Collapse>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
