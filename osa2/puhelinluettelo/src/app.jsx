import React, { useState, useEffect } from "react";
import PersonService from "./services/personService";
import Persons from "./components/persons";
import Form from "./components/form";
import Filter from "./components/filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    PersonService.getAll().then(initialPersons => {
      setPersons(initialPersons);
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
    if (person) {
      const response = window.confirm(
        `${person.name} on jo luettelossa, korvataanko vanha numero uudella?`
      );
      if (response) return handleEdit({ name: newName, number, id: person.id });
    }

    const newPerson = { name: newName, number };
    PersonService.create(newPerson).then(response => {
      setPersons(persons.concat(response));
      setNewName("");
      setNumber("");
    });
  };

  const handleEdit = person => {
    const newObject = PersonService.update(person);
    newObject.then(updatedPerson => {
      setPersons(
        persons.map(p => (p.id !== updatedPerson.id ? p : updatedPerson))
      );
      setNewName("");
      setNumber("");
    });
  };

  const handleDelete = person => {
    const response = window.confirm(`Poistetaanko ${person.name}`);
    if (response)
      PersonService.remove(person).then(response => {
        if (response.status === 200) {
          const newPersons = persons.filter(p => p.id !== person.id);
          setPersons(newPersons);
        }
      });
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
      <Persons persons={persons} filter={filter} onDelete={handleDelete} />
    </div>
  );
};

export default App;
