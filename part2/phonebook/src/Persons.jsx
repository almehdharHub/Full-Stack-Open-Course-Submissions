const Persons = ({ persons, searchName }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );
  console.log("filteredPersons", filteredPersons);

  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
