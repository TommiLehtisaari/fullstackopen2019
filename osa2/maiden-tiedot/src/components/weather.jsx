import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiKey } from "../config.json";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then(result => {
        setWeather(result.data);
      });
  }, [city]);

  if (weather) {
    const { temp_c, condition, wind_kph, wind_dir } = weather.current;
    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>
          <b>temperature:</b> <span>{temp_c} Celsius</span>
        </p>
        <img alt="weather icon" src={condition.icon} />
        <p>
          <b>wind:</b>{" "}
          <span>
            {wind_kph} kph direction {wind_dir}
          </span>
        </p>
      </div>
    );
  }
  return (
    <div>
      <h2>Weather in {city}</h2>
    </div>
  );
};

export default Weather;
