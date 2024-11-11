import { useState, useEffect } from "react";
import appServices from "./services";
import SearchFilter from "./SearchFilter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [idCounter, setIdCounter] = useState(0);
  useEffect(() => {
    console.log("effect");
    appServices.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response);

      const highestId = response.reduce(
        (maxId, person) => Math.max(maxId, person.id),
        0
      );

      setIdCounter(highestId + 1);
      console.log("highestId", highestId);

      console.log(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: idCounter.toString(),
      };
      appServices
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setIdCounter(idCounter + 1);
          setNewName("");
          setNewNumber("");
          setSearchName("");
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const deletePerson = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      appServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleSearch = (event) => {
    let search = event.target.value;
    setSearchName(search);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchName={searchName} handleSearch={handleSearch} />
      <h2>Add a new person</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchName={searchName}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
