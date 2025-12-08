import { Route, Routes } from "react-router-dom";

import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Tapes from "./tapes/Tapes";
import Home from "./Home";
import FormPage from "./tapes/FormPage";
import MyTapes from "./tapes/MyTapes";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
         <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Tapes />
            </AuthorizedRoute>
          }
        />
          <Route
          path="home"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
         <Route
          path="tapes"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Tapes />
            </AuthorizedRoute>
          }
        />
          <Route
          path="form"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <FormPage />
            </AuthorizedRoute>
          }
        />
         <Route
          path="myTapes"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyTapes />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
