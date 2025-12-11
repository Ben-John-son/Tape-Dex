import { useState, useEffect } from "react";
import { getUserTapes, newTape } from "../../managers/tapeManager";
import TapeCard from "./TapeCard";
import { tryGetLoggedInUser } from "../../managers/authManager";
import { Button } from "reactstrap";
import getGenres from "../../managers/genreManager";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function MyTapes() {
  const [user, setUser] = useState(null);
  const [genres, setGenres] = useState([]);
  const [userTapes, setUserTapes] = useState([]);
  const [newForm, setNewForm] = useState(false);
  const [formData, setFormData] = useState({
    
      title:  "",
      description: "",
      userId: "",
      photo:  "",
      studioId: "",
      genreIds: "",
      year: ""
    });

    const navigate = useNavigate();

   const handleCloseForm = () => setNewForm(false);
  const handleShowForm = () => setNewForm(true);

  useEffect(() => {
    tryGetLoggedInUser().then(setUser);
  }, []);

  useEffect(() => {
    if (!user) return;
    getUserTapes(user.id).then(setUserTapes);
  }, [user]);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

 useEffect(() =>
    {
      tryGetLoggedInUser().then((u) =>
      
      setUser(u)
      )
    }, [])

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
      userId: user.id,
      rating: 4
    };

    newTape(payload).then(() => {
      navigate("/myTapes");
      handleCloseForm();
    })
  }


  return (
    <div className="containerMyTapes">
      <h1 className="myTapesHeader">My VHS Collection</h1>
      <Button className="newTapeBtn" onClick={handleShowForm}>Add Tape</Button>
      {<Modal
          show={newForm}
          onHide={handleCloseForm}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Tape</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} >
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
            <Button variant="secondary" onClick={handleCloseForm}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> }
      <div className="myTapesDisplayed">
        {userTapes
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((tape) => (
            <TapeCard tapeObj={tape} key={`tape-${tape.id}`} tapeUser={user} />
          ))}
      </div>
    </div>
  );
}
