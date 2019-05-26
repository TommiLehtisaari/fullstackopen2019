import React, { useState, useEffect } from "react";
import axios from "axios";
import FuzzySearch from "fuzzy-search";
import Filter from "./components/filter";
import Countries from "./components/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(result => setCountries(result.data));
  }, []);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const searcher = new FuzzySearch(countries, ["name", "nativeName"], {
    casesensitive: false
  });

  const filtered_countries = searcher.search(filter);

  return (
    <div>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <Countries countries={filtered_countries} />
    </div>
  );
}

export default App;
