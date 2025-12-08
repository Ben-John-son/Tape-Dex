import getGenres from "../../managers/genreManager";
import TapeForm from "./TapeForm";
import { useState, useEffect } from "react";

export default function FormPage() {
const [genres, setGenres] = useState([]);

useEffect(() =>
{
  getGenres().then((data) => {
    setGenres(data);
    
  });
  
}, [])
console.log(genres)

return (
  
  <div className="formPageContainer">
    <TapeForm genreList={genres}/>
  </div>


);
  


}
