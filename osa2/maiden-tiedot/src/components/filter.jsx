import React from "react";

const Filter = ({ onFilterChange, filter }) => {
  return (
    <div>
      Find countries
      <input onChange={onFilterChange} value={filter} />
    </div>
  );
};

export default Filter;
