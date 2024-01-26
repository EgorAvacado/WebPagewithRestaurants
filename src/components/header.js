import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link className="homepage" to="/">
        CafeMigom
      </Link>
      <div className="logo">
        <Link className="Nazvanie" to="/signup">
          SignUp
        </Link>
        <Link className="Nazvanie" to="/SignIn">
          SignIn
        </Link>
        <Link className="Nazvanie" to="/Youracc">
          Your Page
        </Link>
      </div>
      <div className="header-buttons"></div>
    </div>
  );
};

export default Header;
