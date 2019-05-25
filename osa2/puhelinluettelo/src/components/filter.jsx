import React from "react";

const Filter = ({ onFilterChange, filter }) => {
  return (
    <div>
      Rajaa näytettäviä
      <input onChange={onFilterChange} value={filter} />
    </div>
  );
};

export default Filter;
