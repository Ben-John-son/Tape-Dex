import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Button,
  Col,
  Row,
  Collapse,
} from "reactstrap";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import getGenres from "../../managers/genreManager";
import { deleteTape, updateTape } from "../../managers/tapeManager";
import { getStudios } from "../../managers/studioManager";

export default function TapeCard({ tapeObj, tapeUser, onUpdate }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showTv, setShowTv] = useState(false);
  const [genres, setGenres] = useState([]);
  const [studios, setStudios] = useState([]);

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

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  useEffect(() => {
    getStudios().then(setStudios);
  }, []);
  const toggleDetails = () => setShowDetails((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tapeGenres: formData.genreIds.map((id) => ({ genreId: id })),
    };

    try {
      const updatedTape = await updateTape(tapeObj.id, payload);
      if (onUpdate) onUpdate(updatedTape);
      setShowEdit(false);
    } catch (error) {
      console.error("Failed to update tape:", error);
      alert("Failed to update tape. See console for details.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this tape?")) return;

    try {
      await deleteTape(tapeObj.id);
      if (onUpdate) onUpdate(tapeObj.id);
    } catch (error) {
      console.error("Failed to delete tape:", error);
      alert("Failed to delete tape. See console for details.");
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <CardImg
        className="cardImage"
        top
        src={tapeObj.photo}
        alt={tapeObj.title}
      />

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

                  <p>
                    <strong>Studio:</strong> {tapeObj.studio.name}
                  </p>
                </section>

                {tapeUser && tapeUser.id === tapeObj.userId && (
                  <>
                    <Button
                      size="sm"
                      className="me-2"
                      onClick={() => setShowEdit(true)}
                    >
                      Edit
                    </Button>
                    <Button size="sm" color="danger" onClick={handleDelete}>
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </Collapse>
          </Col>
        </Row>

        <Modal
          show={showEdit}
          onHide={() => setShowEdit(false)}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit {tapeObj.title}</Modal.Title>
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

                <Select
                  value={
                    studios
                      .filter((s) => s.id === formData.studioId)
                      .map((s) => ({ value: s.id, label: s.name }))[0] || null
                  }
                  options={studios.map((s) => ({
                    value: s.id,
                    label: s.name,
                  }))}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      studioId: selected.value,
                    }))
                  }
                  isClearable
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Genres</label>
                <Select
                  isMulti
                  value={genres
                    .filter((g) => formData.genreIds.includes(g.id))
                    .map((g) => ({ value: g.id, label: g.name }))}
                  options={genres.map((g) => ({
                    value: g.id,
                    label: g.name,
                  }))}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      genreIds: selected.map((s) => s.value),
                    }))
                  }
                />
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </Modal.Body>
        </Modal>

        <Button className="mt-2" onClick={() => setShowTv(true)}>
          Video
        </Button>

        <Modal show={showTv} onHide={() => setShowTv(false)} backdrop="static">
          <img id="crtT" src="/images/crtMain.png" alt="CRT TV" />

          <iframe
            id="ytT"
            src="https://www.youtube.com/embed/aCWg50TKqb4?autoplay=1&mute=1&loop=1&playlist=aCWg50TKqb4"
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />

          <Button variant="secondary" onClick={() => setShowTv(false)}>
            Close
          </Button>
        </Modal>
      </CardBody>
    </Card>
  );
}
