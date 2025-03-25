import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

import "./Navbar.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const apiKey = import.meta.env.VITE_API_KEY;
const languageUrl = import.meta.env.VITE_API_LANGUAGE;

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("pt-BR");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`);
    setSearch("");
  };

  const getLanguages = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setLanguages(data);
  };

  useEffect(() => {
    const finaLanguageUrl = `${languageUrl}?${apiKey}`;
    getLanguages(finaLanguageUrl);
  }, [selectedLanguage]);

  return (
    <nav id="navbar">
      <div className="logo bx-shadow" onClick={() => navigate("/")}>
        <BiCameraMovie />
        <p>
          {/* <Link to="/"> */}
          Movies
          {/* </Link> */}
        </p>
      </div>
      <div>
        <ul>
          <li>
            <Link className="link" to="/movies">
              Filmes
            </Link>
          </li>
          <li>
            <Link className="link" to="/series">
              Séries
            </Link>
          </li>
          <li>
            <Link className="link" to="/people">
              Pessoas
            </Link>
          </li>
        </ul>
      </div>
      <div className="search-container">
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
          <select
            className="language-select bx-shadow"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages &&
              languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
          </select>
        </form>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
