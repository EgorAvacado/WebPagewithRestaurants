import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link className="homepage" to="/home">
        CafeMigom
      </Link>
      <div className="logo">
        <Link className="Nazvanie" to="/signup">
          SignUp
        </Link>
      </div>
      <div className="header-buttons"></div>
    </div>
  );
};

export default Header;
