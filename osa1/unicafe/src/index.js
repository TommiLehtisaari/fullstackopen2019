import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, label }) => {
  return <button onClick={handleClick}>{label}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const avg = (good * 1 - bad * 1) / total;
  const positive = `${Math.ceil((good / total) * 100)}%`;

  if (total === 0) return <div>Ei yhtään palautetta annettu</div>;

  return (
    <div>
      <table>
        <tbody>
          <Statistic label="hyvä" value={good} />
          <Statistic label="neutraali" value={neutral} />
          <Statistic label="huono" value={bad} />
          <Statistic label="yhteensä" value={total} />
          <Statistic label="keskiarvo" value={avg} />
          <Statistic label="positiivisia" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const Statistic = ({ label, value }) => {
  return (
    <tr key="label">
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Annapalautetta</h1>
      <Button handleClick={() => setGood(good + 1)} label="hyvä" />
      <Button handleClick={() => setNeutral(neutral + 1)} label="neutraali" />
      <Button handleClick={() => setBad(bad + 1)} label="huono" />
      <h1>Statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
