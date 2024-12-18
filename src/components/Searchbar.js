import React, { useState } from "react";

const Search = ({ data, onFilter, placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (val) => val && val.toString().toLowerCase().includes(value),
      ),
    );
    onFilter(filteredData);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  );
};

export default Search;
