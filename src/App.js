import React from "react";
import Header from "./components/header";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import SignUp from "./components/SighUp";

const App = () => {
  const currentLocation = useLocation();

  return (
    <>
      <Header location={currentLocation} />
      <Routes>
        <Route>
          <Route path="/home" element={<Layout />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
