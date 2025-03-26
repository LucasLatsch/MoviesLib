import React from "react";
import "./TitleSection.css";
import TimeRangeToggle from "../Toggle/TimeRangeToggle";

const TitleSection = ({ timeWindow, setTimeWindow, title, toggle = false }) => {
  return (
    <div className="title-container">
      <div>
        <p className="title border-line">{title}</p>
      </div>
      {toggle && (
        <TimeRangeToggle
          timeWindow={timeWindow}
          setTimeWindow={setTimeWindow}
        />
      )}
    </div>
  );
};

export default TitleSection;
