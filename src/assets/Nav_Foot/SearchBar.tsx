import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
      <img src="/search-icon.png" style={{height: "20px", marginBottom: "-5px", color: "#9c8779"}}/>
    </div>
  );
};

export default SearchBar;
