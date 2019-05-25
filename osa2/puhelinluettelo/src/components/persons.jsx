import React from "react";

const Persons = ({ filter, persons }) => {
  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filtered.map((item, id) => (
        <p key={id}>
          {item.name} {item.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
