import React from "react";
import Header from "./components/header";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserAccount from "./components/UserAccount";

const App = () => {
  const currentLocation = useLocation();

  return (
    <>
      <Header location={currentLocation} />
      <Routes>
        <Route>
          <Route path="/" element={<Layout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Youracc" element={<UserAccount />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
