import { useState, useEffect } from "react";
import { getUserTapes, newTape } from "../../managers/tapeManager";
import TapeCard from "./TapeCard";
import { tryGetLoggedInUser } from "../../managers/authManager";
import { Button, CardBody, CardTitle } from "reactstrap";
import getGenres from "../../managers/genreManager";
import { Modal, Dropdown, Card, ButtonGroup } from "react-bootstrap";
import Select from "react-select";
import {
  getStudiosByUser,
  getStudioById,
  newStudio,
  updateStudio,
  getStudios,
  deleteStudio,
} from "../../managers/studioManager";

export default function MyTapes() {
  const [user, setUser] = useState(null);
  const [genres, setGenres] = useState([]);
  const [userTapes, setUserTapes] = useState([]);
  const [studios, setStudios] = useState([]);
  const [allStudios, setAllStudios] = useState([]);

  const [newTapeForm, setNewTapeForm] = useState(false);
  const [newStudioForm, setNewStudioForm] = useState(false);
  const [editStudioForm, setEditStudioForm] = useState(false);

  const [tapeData, setTapeData] = useState({
    title: "",
    description: "",
    photo: "",
    studioId: null,
    genreIds: [],
    year: "",
  });

  const [newStudioData, setNewStudioData] = useState({
    name: "",
    country: "",
  });
  const [editStudioData, setEditStudioData] = useState({
    id: null,
    name: "",
    country: "",
  });


    useState(() => {
      getStudios().then(setAllStudios);
    })
  useEffect(() => {
    tryGetLoggedInUser().then(setUser).catch(console.error);
  }, []);

  const fetchUserTapes = async () => {
    if (!user) return;
    try {
      const data = await getUserTapes(user.id);
      setUserTapes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUserTapes();
  }, [user]);

  // Fetch studios
  const fetchUserStudios = async () => {
    if (!user) return;
    try {
      const data = await getStudiosByUser(user.id);
      setStudios(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUserStudios();
  }, [user]);

  useEffect(() => {
    getGenres().then(setGenres).catch(console.error);
  }, []);

  const handleTapeChange = (e) => {
    const { name, value } = e.target;
    setTapeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTapeSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const payload = {
      ...tapeData,
      tapeGenres: tapeData.genreIds.map((id) => ({ genreId: id })),
      userId: user.id,
      rating: 4,
    };

    try {
      await newTape(payload);
      setNewTapeForm(false);
      setTapeData({
        title: "",
        description: "",
        photo: "",
        studioId: "",
        genreIds: [],
        year: "",
      });
      fetchUserTapes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewStudioChange = (e) => {
    const { name, value } = e.target;
    setNewStudioData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteStudio = async (id) => {
      if (!window.confirm("Delete this studio?")) return;
  
      try {
        await deleteStudio(id);
        await fetchUserStudios();
      } catch (error) {
        console.error("Failed to delete studio:", error);
        alert("Failed to delete studio.");
      }
    };

  const handleNewStudioSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await newStudio({ ...newStudioData, userId: user.id });
      setNewStudioForm(false);
      setNewStudioData({ name: "", country: "" });
      fetchUserStudios();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = async (studioId) => {
    try {
      const data = await getStudioById(studioId);
      setEditStudioData({
        id: data.id,
        name: data.name,
        country: data.country,
      });
      setEditStudioForm(true);
    } catch (err) {
      console.error("Failed to load studio for edit", err);
    }
  };

  const handleEditStudioChange = (e) => {
    const { name, value } = e.target;
    setEditStudioData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditStudioSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudio(editStudioData.id, editStudioData);
      setEditStudioForm(false);
      fetchUserStudios();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="containerMyTapes">
      <h1>My VHS Collection</h1>

      <Button onClick={() => setNewTapeForm(true)}>Add Tape</Button>
      <Button onClick={() => setNewStudioForm(true)}>Add Studio</Button>

      <Dropdown as={ButtonGroup}>
        <Button variant="success">My Studios</Button>
        <Dropdown.Toggle split variant="success" />
        <Dropdown.Menu>
          {studios.map((studio) => (
            <Card key={studio.id} className="studioCard">
              <CardBody>
                <CardTitle>{studio.name}</CardTitle>
                <div className="studioActions">
                  <Button size="sm" onClick={() => handleEditClick(studio.id)}>
                    Edit
                  </Button>
                  <Button size="sm" color="danger" onClick={() => handleDeleteStudio(studio.id)}>
                    Delete
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={newStudioForm} onHide={() => setNewStudioForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Studio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleNewStudioSubmit}>
            <input
              type="text"
              name="name"
              value={newStudioData.name}
              onChange={handleNewStudioChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="country"
              value={newStudioData.country}
              onChange={handleNewStudioChange}
              placeholder="Country"
              required
            />
            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={editStudioForm} onHide={() => setEditStudioForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Studio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditStudioSubmit}>
            <input
              type="text"
              name="name"
              value={editStudioData.name}
              onChange={handleEditStudioChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="country"
              value={editStudioData.country}
              onChange={handleEditStudioChange}
              placeholder="Country"
              required
            />
            <Button type="submit">Save Changes</Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={newTapeForm} onHide={() => setNewTapeForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Tape</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleTapeSubmit}>
            <input
              type="text"
              name="title"
              value={tapeData.title}
              onChange={handleTapeChange}
              placeholder="Title"
              required
            />
            <textarea
              name="description"
              value={tapeData.description}
              onChange={handleTapeChange}
              placeholder="Description"
              required
            />
            <input
              type="text"
              name="photo"
              value={tapeData.photo}
              onChange={handleTapeChange}
              placeholder="Cover Photo URL"
            />
            <Select
              name="studioId"
              value={
                allStudios
                  .map((s) => ({ value: s.id, label: s.name }))
                  .find((opt) => opt.value === tapeData.studioId) || null
              }
              options={allStudios.map((s) => ({
                value: s.id,
                label: s.name,
              }))}
              onChange={(selected) =>
                setTapeData((prev) => ({
                  ...prev,
                  studioId: selected ? selected.value : null,
                }))
              }
              placeholder="Studio"
            />
            <input
              type="text"
              name="year"
              value={tapeData.year}
              onChange={handleTapeChange}
              placeholder="Year Made"
            />
            <Select
              isMulti
              value={genres
                .filter((g) => tapeData.genreIds.includes(g.id))
                .map((g) => ({ value: g.id, label: g.name }))}
              options={genres.map((g) => ({ value: g.id, label: g.name }))}
              onChange={(selected) =>
                setTapeData((prev) => ({
                  ...prev,
                  genreIds: selected.map((s) => s.value),
                }))
              }
            />
            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="myTapesDisplayed">
        {userTapes
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((tape) => (
            <TapeCard
              key={tape.id}
              tapeObj={tape}
              tapeUser={user}
              onUpdate={fetchUserTapes}
            />
          ))}
      </div>
    </div>
  );
}
