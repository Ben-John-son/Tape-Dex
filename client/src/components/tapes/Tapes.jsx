import { useState, useEffect } from "react";
import { getTapes } from "../../managers/tapeManager";
import TapeCard from "./TapeCard";


export default function Tapes() {
const [tapes, setTapes] = useState([]);

useEffect(() => {
  getTapes().then(setTapes)
}, []);


  return (
    <div className="containerTapes">
      <div className="tapesDisplayed">
        {tapes.map((tape) =>
        (
         <TapeCard tapeObj={tape}
         key={`tape-${tape.id}`}></TapeCard>
        )
            
        )}


      </div>
    </div>
  )
}
