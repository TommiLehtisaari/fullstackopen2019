import React, { useState, useEffect } from "react";
import PersonService from "./services/personService";
import Persons from "./components/persons";
import Form from "./components/form";
import Filter from "./components/filter";
import Message from "./components/message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState();

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
      handleMessage({
        content: `Lisättiin ${newPerson.name}`,
        type: "success"
      });
    });
  };

  const handleEdit = person => {
    const newObject = PersonService.update(person);
    newObject
      .then(updatedPerson => {
        setPersons(
          persons.map(p => (p.id !== updatedPerson.id ? p : updatedPerson))
        );
        setNewName("");
        setNumber("");
        handleMessage({
          content: `Henkilön ${person.name} numero vaihdettu`,
          type: "success"
        });
      })
      .catch(error => {
        handleMessage({
          content: `Henkilön ${person.name} tietojen muokkaus epäonnistui`,
          type: "error"
        });
      });
  };

  const handleDelete = person => {
    const response = window.confirm(`Poistetaanko ${person.name}`);
    if (response)
      PersonService.remove(person)
        .then(response => {
          handleMessage({
            content: `Henkilö ${person.name} poistettu`,
            type: "success"
          });
        })
        .catch(error => {
          handleMessage({
            content: `Henkilö ${person.name} oli jo poistettu`,
            type: "error"
          });
        })
        .finally(response => {
          const newPersons = persons.filter(p => p.id !== person.id);
          setPersons(newPersons);
        });
  };

  const handleMessage = message => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Message message={message} />
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
