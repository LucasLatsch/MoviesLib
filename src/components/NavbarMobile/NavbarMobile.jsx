import React, { useState } from "react";
import "./NavbarMobile.css";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import ThemeToggle from "../Toggle/ThemeToggle";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`);
    setSearch("");
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <BiCameraMovie />
          <p>Movies</p>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
        </div>
      </div>

      <div>
        <ul className={isOpen ? "nav-links active" : "nav-links"}>
          <li>
            <ThemeToggle />
          </li>
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
          <li>
            <form>
              <input
                className="bx-shadow"
                type="text"
                placeholder="Busque um filme aqui..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button className="bx-shadow" onClick={handleSubmit}>
                <BiSearchAlt2 />
              </button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarMobile;
