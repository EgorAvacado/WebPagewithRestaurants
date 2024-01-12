import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <input type="text" className="search-bar" placeholder="Поиск" />
      <div className="logo">
        <Link className="Nazvanie" to="/">
          Gamigos
        </Link>
      </div>
      <div className="header-buttons"></div>
    </div>
  );
};

export default Header;
