import React from "react";
import "./TimeRangeToggle.css";

const Toggle = ({ timeWindow, setTimeWindow, title, toggle = true }) => {
  return (
    <div className="toggle-container">
      <div>
        <p className="title border-line">
          {title === "movie"
            ? "Filmes recomendados"
            : title === "tv"
            ? "Recomendados na Tv"
            : "Recomendados"}
        </p>
      </div>
      {toggle && (
        <div className="bx-shadow">
          <button
            className="first btn"
            disabled={timeWindow === "day"}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </button>
          <button
            className="second btn"
            disabled={timeWindow === "week"}
            onClick={() => setTimeWindow("week")}
          >
            Week
          </button>
        </div>
      )}
    </div>
  );
};

export default Toggle;
