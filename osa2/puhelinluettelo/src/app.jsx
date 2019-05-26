import React, { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/persons";
import Form from "./components/form";
import Filter from "./components/filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const person = persons.find(person => person.name === newName);
    if (person) return alert(`${person.name} on jo luettelossa`);
    setPersons(persons.concat({ name: newName, number }));
    setNewName("");
    setNumber("");
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter onFilterChange={handleFilterChange} filter={filter} />
      <h2>lisää uusi</h2>
      <Form
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        newName={newName}
        number={number}
      />
      <h2>Numerot</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
