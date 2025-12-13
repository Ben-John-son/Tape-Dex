import { useState, useEffect } from "react";
import { getUserTapes, newTape } from "../../managers/tapeManager";
import TapeCard from "./TapeCard";
import { tryGetLoggedInUser } from "../../managers/authManager";
import { Button } from "reactstrap";
import getGenres from "../../managers/genreManager";
import { Modal, Dropdown } from "react-bootstrap";
import Select from "react-select";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { getStudios } from "../../managers/studioManager";

export default function MyTapes() {
  const [user, setUser] = useState(null);
  const [genres, setGenres] = useState([]);
  const [userTapes, setUserTapes] = useState([]);
  const [studios, setStudios] = useState([]);
  const [newForm, setNewForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photo: "",
    studioId: "",
    genreIds: [],
    year: "",
  });

  const handleCloseForm = () => setNewForm(false);
  const handleShowForm = () => setNewForm(true);

  useEffect(() => {
    tryGetLoggedInUser().then(setUser).catch(console.error);
  }, []);

  useEffect(() => 
  {
      getStudios().then(setStudios);
  }, [])

  useEffect(() => {
    getGenres().then(setGenres).catch(console.error);
  }, []);

  const fetchUserTapes = async () => {
    if (!user) return;
    try {
      const data = await getUserTapes(user.id);
      setUserTapes(data);
    } catch (error) {
      console.error("Failed to fetch user tapes:", error);
    }
  };

  useEffect(() => {
   
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUserTapes();
  }, [user]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const payload = {
      ...formData,
      tapeGenres: formData.genreIds.map((id) => ({ genreId: id })),
      userId: user.id,
      rating: 4,
    };

    try {
      await newTape(payload);
      handleCloseForm();
      fetchUserTapes();
      setFormData({
        title: "",
        description: "",
        photo: "",
        studioId: "",
        genreIds: [],
        year: "",
      });
    } catch (error) {
      console.error("Failed to add new tape:", error);
      alert("New tape failed.");
    }
  };

  return (
    <div className="containerMyTapes">
      <h1 className="myTapesHeader">My VHS Collection</h1>
      <Button className="newTapeBtn" onClick={handleShowForm}>
        Add Tape
      </Button>
      <Button className="newStudioBtn">Add Studio</Button>
      <Dropdown as={ButtonGroup}>
      <Button variant="success">Split Button</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
       {studios.filter((s) => s)}
      </Dropdown.Menu>
    </Dropdown>

      <Modal show={newForm} onHide={handleCloseForm} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Tape</Modal.Title>
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
              <label className="form-label">Year Made</label>
              <input
                type="text"
                name="year"
                className="form-control"
                value={formData.year}
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
                  setFormData((prev) => ({
                    ...prev,
                    genreIds: selected.map((s) => s.value),
                  }))
                }
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForm}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="myTapesDisplayed">
        {userTapes
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((tape) => (
            <TapeCard
              tapeObj={tape}
              key={`tape-${tape.id}`}
              tapeUser={user}
              onUpdate={fetchUserTapes}
            />
          ))}
      </div>
    </div>
  );
}
