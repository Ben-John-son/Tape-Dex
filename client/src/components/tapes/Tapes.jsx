import { useState, useEffect } from "react";
import { getTapes } from "../../managers/tapeManager";
import TapeCard from "./TapeCard";
import getGenres from "../../managers/genreManager";
import { tryGetLoggedInUser } from "../../managers/authManager";
const years = [];
for (let year = 1976; year <= 2007; year++) {
  years.push(year);
}

export default function Tapes() {
  const [tapes, setTapes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredTapes, setFilteredTapes] = useState([]);
  const [selectedYear, setSelectedYear] = useState();
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    getTapes().then((data) => {
      setTapes(data);
      setFilteredTapes(data); 
    });
  }, [refreshKey]);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  useEffect(() =>
    {
      tryGetLoggedInUser().then((u) =>
      
      setUser(u)
      )
    }, [])


  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSelectedGenre(value);

    if (value === "") {
      setFilteredTapes(tapes); 
      return;
    }

    const filtered = tapes.filter((tape) =>
      tape.tapeGenres.some((tg) => tg.genre.name === value)
    );


    setFilteredTapes(filtered);
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setSelectedYear(value);
    if (value == "")
    {
      setFilteredTapes(tapes)
      return;
    }
    const filtered = tapes.filter((tape) =>
    tape.year == value);

    setFilteredTapes(filtered);

  }

  return (
    <div className="containerTapes">
      <div className="tapesDisplayed">
        {filteredTapes.slice().sort((a, b) => a.title.localeCompare(b.title))
        .map((tape) => (
          <TapeCard tapeObj={tape} key={`tape-${tape.id}`} tapeUser={user} onUpdate={() => setRefreshKey(prev => prev + 1)}/>
        ))}
      </div>

      <div className="containerBtns">
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>

        <select value={selectedYear} onChange={handleYearChange}>
            <option value="">Year</option>
            {years.map((y) =>
            
           <option value={y} key={y}>{y}</option>
            )}
            
          
        </select>
      </div>
    </div>
  );
}
