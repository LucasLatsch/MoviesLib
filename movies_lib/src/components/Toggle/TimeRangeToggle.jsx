import React from "react";

const TimeRangeToggle = ({ timeWindow, setTimeWindow }) => {
  return (
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
  );
};

export default TimeRangeToggle;
