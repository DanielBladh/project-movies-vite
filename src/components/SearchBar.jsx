import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ handleSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    // Call the handleSearch function with the entered search term
    handleSearch(searchValue);
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is "Enter"
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="search-input"
      />
      <button onClick={handleSearchClick} className="search-button">
      🔍 Search
      </button>
    </div>
  );
}
