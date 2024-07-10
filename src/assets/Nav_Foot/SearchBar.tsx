import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    axios.get(`https://shoppingback-ltd0.onrender.com/products/search`, { params: { name: searchTerm } })
      .then(response => {
        console.log("Search results:", response.data);
        navigate('/search-results', { state: { results: response.data } });
      })
      .catch(error => {
        console.error("There was an error making the request:", error);
      });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <img
        src="/search-icon.png"
        style={{ height: "20px", marginBottom: "-5px", color: "#9c8779", cursor: "pointer" }}
        onClick={handleSearch}
        alt="Search"
      />
    </div>
  );
};

export default SearchBar;
