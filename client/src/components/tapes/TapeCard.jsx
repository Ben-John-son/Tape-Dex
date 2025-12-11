import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
  Col,
  Row,
  Collapse,
  ModalBody,
} from "reactstrap";
import { Modal } from "react-bootstrap";
import getGenres from "../../managers/genreManager";
import Select from "react-select";
import { updateTape } from "../../managers/tapeManager";
import { useNavigate } from "react-router-dom";

export default function TapeCard({ tapeObj, tapeUser, onUpdate }) {
  const [showDetails, setShowDetails] = useState(false);
  const [show, setShow] = useState(false);
  const [showTv, setShowTv] = useState(false)
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    id: tapeObj.id,
    title: tapeObj.title || "",
    description: tapeObj.description || "",
    userId: tapeObj.userId || 0,
    photo: tapeObj.photo || "",
    studioId: tapeObj.studioId || 0,
    genreIds: tapeObj.tapeGenres
      ? tapeObj.tapeGenres.map((tg) => tg.genreId)
      : [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tapeGenres: formData.genreIds.map((id) => ({ genreId: id })),
    };

    updateTape(tapeObj.id, payload).then(() => {
      navigate("/tapes");
      onUpdate();
      handleClose();
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseTv = () => setShowTv(false);
  const handleShowTv = () => setShowTv(true);

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
              <div
                className="mt-2 p-2 border rounded"
                style={{ backgroundColor: "#1a1a1a", color: "white" }}
              >
                <p>{tapeObj.description}</p>
                <p>Released on VHS: {tapeObj.year}</p>
                <section>
                  <strong>
                    {tapeObj.tapeGenres.length === 1 ? "Genre" : "Genres"}:
                  </strong>
                  {tapeObj.tapeGenres.map((tg) => (
                    <p key={tg.id}>{tg.genre.name}</p>
                  ))}
                  <strong> Studio: {tapeObj.studio.name}</strong>
                </section>
              </div>
              {tapeUser && tapeUser.id === tapeObj.userId && (
                <>
                  <Button onClick={handleShow}>Edit</Button>
                  <Button>Delete</Button>
                </>
              )}
            </Collapse>
          </Col>
        </Row>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{tapeObj.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Cover Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  className="form-control"
                  value={formData.photo}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Studio</label>
                <input
                  type="number"
                  name="studioId"
                  className="form-control"
                  value={formData.studioId}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Genres</label>
                <Select
                  isMulti
                  value={genres
                    .filter((g) => formData.genreIds.includes(g.id))
                    .map((g) => ({ value: g.id, label: g.name }))}
                  options={genres.map((g) => ({ value: g.id, label: g.name }))}
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      genreIds: selected.map((s) => s.value),
                    })
                  }
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Modal.Body>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Button onClick={handleShowTv}>Video</Button>
        <Modal
          show={showTv}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          
            <img id="crtT" src="/images/crtMain.png"></img>

            <iframe
              id="ytT"
              src="https://www.youtube.com/embed/aCWg50TKqb4?si=FcVKP6_0c9FCsRZr"
              title="YouTube video player"
              frameborder="0"
              allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
        
         
            <Button variant="secondary" onClick={handleCloseTv}>
              Close
            </Button>
         
        </Modal>
         
      </CardBody>
    </Card>
  );
}
