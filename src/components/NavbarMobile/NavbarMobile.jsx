import React, { useState } from "react";
import "./NavbarMobile.css";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        <BiCameraMovie />
        <p>Movies</p>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={isOpen ? "bar open" : "bar"}></div>
        <div className={isOpen ? "bar open" : "bar"}></div>
        <div className={isOpen ? "bar open" : "bar"}></div>
      </div>
      <ul className={isOpen ? "nav-links active" : "nav-links"}>
        <li>
          <Link className="links" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="links" to="/movies">
            Filmes
          </Link>
        </li>
        <li>
          <Link className="links" to="/series">
            Series
          </Link>
        </li>
        <li>
          <Link className="links" to="/people">
            Pessoas
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarMobile;
