import { useState, useEffect } from "react";
import { getUserTapes } from "../../managers/tapeManager";
import TapeCard from "./TapeCard";
import { tryGetLoggedInUser } from "../../managers/authManager";
import { Button } from "reactstrap";

export default function MyTapes() {
  const [user, setUser] = useState(null);
  const [userTapes, setUserTapes] = useState([]);

  useEffect(() => {
    tryGetLoggedInUser().then(setUser);
  }, []);

  useEffect(() => {
    if (!user) return;
    getUserTapes(user.id).then(setUserTapes);
  }, [user]);

  return (
    <div className="containerMyTapes">
      <h1 className="myTapesHeader">My VHS Collection</h1>
      <Button className="newTapeBtn">Add Tape</Button>
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
