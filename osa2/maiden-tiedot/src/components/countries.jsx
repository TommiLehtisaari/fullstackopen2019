import React from "react";
import Country from "./country";

const Countries = ({ countries }) => {
  const len = countries.length;
  if (len === 1) return <Country country={countries[0]} />;
  if (len > 10) return <div>Too many matches, spesify another filter</div>;
  return (
    <div>
      {countries.map((country, id) => (
        <Country key={id} country={country} />
      ))}
    </div>
  );
};

export default Countries;
