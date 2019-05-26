import React, { useState } from "react";
import Weather from "./weather";

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const { name, capital, population, languages, flag } = country;

  if (!show)
    return (
      <div>
        {name}
        <button onClick={handleShow}>show</button>
      </div>
    );
  return (
    <div>
      <h2>
        {name}
        <button onClick={handleShow}>hide</button>
      </h2>
      <p>capital {capital}</p>
      <p>pupulation {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map((lan, id) => (
          <li key={id}>{lan.name}</li>
        ))}
      </ul>
      <img width="200px" src={flag} alt="flag" />
      <Weather city={capital} />
    </div>
  );
};

export default Country;
