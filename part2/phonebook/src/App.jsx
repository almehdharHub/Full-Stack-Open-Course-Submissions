import { useState, useEffect } from "react";
import appServices from "./services";
import SearchFilter from "./SearchFilter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [idCounter, setIdCounter] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  useEffect(() => {
    appServices.getAll().then((response) => {
      setPersons(response);

      const highestId = response.reduce(
        (maxId, person) => Math.max(maxId, person.id),
        0
      );

      setIdCounter(highestId + 1);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (existingPerson) {
      if (
        window.confirm(
          `Update phone number for ${newName}? Current number is ${existingPerson.number}`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        appServices
          .update(updatedPerson.id, updatedPerson)
          .then(() => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? updatedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
            setSearchName("");
            setNotificationMessage(`Updated ${updatedPerson.name}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
          setNotificationMessage(`Added ${response.name}`);
          setNotificationType("success");
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const deletePerson = (id) => {
    const existingPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${existingPerson.name}?`)) {
      appServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error(error);
          setNotificationMessage(
            `Information of ${existingPerson.name} has already been removed from server`
          );
          setNotificationType("error");
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
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
      <Notification message={notificationMessage} type={notificationType} />
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
