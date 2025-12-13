// import { useState, useEffect } from "react";
// import { getTapes } from "../../managers/tapeManager";
// import TapeCard from "./TapeCard";
// import getGenres from "../../managers/genreManager";
// import { tryGetLoggedInUser } from "../../managers/authManager";
// import { getStudios } from "../../managers/studioManager";
// const years = [];
// for (let year = 1976; year <= 2007; year++) {
//   years.push(year);
// }

// export default function Tapes() {
//   const [tapes, setTapes] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [filteredTapes, setFilteredTapes] = useState([]);
//   const [selectedYear, setSelectedYear] = useState();
//   const [user, setUser] = useState(null);
//   // const [refreshKey, setRefreshKey] = useState(0);
//   const [studios, setStudios] = useState([]);
//   const [selectedStudio, setSelectedStudio] = useState("");

//   // useEffect(() => {
//   //   getTapes().then((data) => {
//   //     setTapes(data);
//   //     setFilteredTapes(data); 
//   //   });
//   // }, []);

//   useEffect(() => {
//     getGenres().then(setGenres);
//   }, []);

//   useEffect(() =>
//     {
//       tryGetLoggedInUser().then((u) =>
      
//       setUser(u)
//       )
//     }, []);

//     useEffect(() => {
//       getStudios().then(setStudios);
//     }, [])


//   const handleGenreChange = (e) => {
//     const value = e.target.value;
//     setSelectedGenre(value);

//     if (value === "") {
//       setFilteredTapes(tapes); 
//       return;
//     }

//     const filtered = tapes.filter((tape) =>
//       tape.tapeGenres.some((tg) => tg.genre.name === value)
//     );


//     setFilteredTapes(filtered);
//   };

//   const handleStudioChange = (e) => {
//     const value = e.target.value;
//     setSelectedStudio(value);

//     if (value === "") {
//       setFilteredTapes(tapes);
//       return;
//     }

//     const filtered =  tapes.filter((ts) => 
//    ts.studio.name == value);

//     setFilteredTapes(filtered);
//   }

//   const handleYearChange = (e) => {
//     const value = e.target.value;
//     setSelectedYear(value);
//     if (value == "")
//     {
//       setFilteredTapes(tapes)
//       return;
//     }
//     const filtered = tapes.filter((tape) =>
//     tape.year == value);

//     setFilteredTapes(filtered);

//   }

//   const getAllTapes = () => {
//   getTapes().then((data) => {
//     setTapes(data);
//     setFilteredTapes(data);
//   });
// };


// useEffect(() => {
//   getAllTapes();
// }, []);


//   return (
//     <div className="containerTapes">
//       <div className="tapesDisplayed">
//         {filteredTapes.slice().sort((a, b) => a.title.localeCompare(b.title))
//         .map((tape) => (
//           <TapeCard tapeObj={tape} key={`tape-${tape.id}`} tapeUser={user} onUpdate={getAllTapes}/>
//         ))}
//       </div>

//       <div className="containerBtns">
//         <select value={selectedGenre} onChange={handleGenreChange}>
//           <option value="">All Genres</option>
//           {genres.map((g) => (
//             <option key={g.id} value={g.name}>
//               {g.name}
//             </option>
//           ))}
//         </select>

//         <select value={selectedYear} onChange={handleYearChange}>
//             <option value="">Year</option>
//             {years.map((y) =>
            
//            <option value={y} key={y}>{y}</option>
//             )}
//         </select>
//         <select value={selectedStudio} onChange={handleStudioChange}>
//           <option value="">All Studios</option>
//           {studios.map((s) =>
//           (
//             <option key={s.id} value={s.name}>{s.name}</option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { getTapes } from "../../managers/tapeManager";
import TapeCard from "./TapeCard";
import getGenres from "../../managers/genreManager";
import { tryGetLoggedInUser } from "../../managers/authManager";
import { getStudios } from "../../managers/studioManager";

const years = [];
for (let year = 1976; year <= 2007; year++) {
  years.push(year);
}

export default function Tapes() {
  const [tapes, setTapes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredTapes, setFilteredTapes] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStudio, setSelectedStudio] = useState("");
  const [user, setUser] = useState(null);
  const [studios, setStudios] = useState([]);


  const fetchTapes = async () => {
    try {
      const data = await getTapes();
      setTapes(data);
      setFilteredTapes(data);
    } catch (error) {
      console.error("Failed to fetch tapes:", error);
    }
  };

  useEffect(() => {
    getGenres().then(setGenres).catch(console.error);
  }, []);

 
  useEffect(() => {
    tryGetLoggedInUser().then(setUser).catch(console.error);
  }, []);

  
  useEffect(() => {
    getStudios().then(setStudios).catch(console.error);
  }, []);

  // Initial fetch of all tapes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTapes();
  }, []);

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSelectedGenre(value);
    setFilteredTapes(
      value === ""
        ? tapes
        : tapes.filter((t) =>
            t.tapeGenres.some((tg) => tg.genre.name === value)
          )
    );
  };

  const handleStudioChange = (e) => {
    const value = e.target.value;
    setSelectedStudio(value);
    setFilteredTapes(
      value === "" ? tapes : tapes.filter((t) => t.studio.name === value)
    );
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setSelectedYear(value);
    setFilteredTapes(
      value === "" ? tapes : tapes.filter((t) => t.year == value)
    );
  };

  return (
    <div className="containerTapes">
      <div className="tapesDisplayed">
        {filteredTapes
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((tape) => (
            <TapeCard
              tapeObj={tape}
              key={`tape-${tape.id}`}
              tapeUser={user}
              onUpdate={fetchTapes} 
            />
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
          {years.map((y) => (
            <option value={y} key={y}>
              {y}
            </option>
          ))}
        </select>

        <select value={selectedStudio} onChange={handleStudioChange}>
          <option value="">All Studios</option>
          {studios.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
