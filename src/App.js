import React from "react";
import Header from "./components/header";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import RestaurantDetailsPage from "./components/RestaurantDetailsPage";
const App = () => {
  const currentLocation = useLocation();

  return (
    <>
      <Header location={currentLocation} />
      <Routes>
        <Route>
          <Route path="/" element={<Layout />} />
          <Route
            path="/restaurant/:restaurantId"
            element={<RestaurantDetailsPage />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
