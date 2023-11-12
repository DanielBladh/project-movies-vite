import React from "react";
import "./Dropdown.css";

export default function Dropdown({ selectedOption, onSelectOption }) {
  return (
    <div className="select-container">
      <select
        className="select"
        value={selectedOption}
        onChange={(e) => onSelectOption(e.target.value)}
      >
        <option value="popular" className="select-option">
          Popular
        </option>
        <option value="upcoming" className="select-option">
          Upcoming
        </option>
        <option value="top_rated" className="select-option">
          Top Rated
        </option>
      </select>
    </div>
  );
}
