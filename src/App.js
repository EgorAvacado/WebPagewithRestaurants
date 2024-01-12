import React from "react";
import Header from "./components/header";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";

const App = () => {
  const currentLocation = useLocation();

  return (
    <>
      <Header location={currentLocation} />
      <Routes>
        <Route>
          <Route path="/" element={<Layout />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
