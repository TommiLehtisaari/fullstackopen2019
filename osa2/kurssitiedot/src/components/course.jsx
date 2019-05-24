import React from "react";
import Header from "./header";
import Part from "./part";

const Course = ({ course }) => {
  const { name, parts } = course;
  const total_exercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <React.Fragment>
      <Header name={name} />
      {parts.map((item, id) => (
        <Part key={id} part={item} />
      ))}
      <p>yhteensä {total_exercises} tehtävää</p>
    </React.Fragment>
  );
};

export default Course;
