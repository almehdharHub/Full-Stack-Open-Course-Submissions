import { useState, useEffect } from "react";
import axious from "axios";

const Country = ({ filteredCountries, formatLanguages }) => {
  return (
    <>
      <h2>{filteredCountries[0].name.common}</h2>
      <p>capital: {filteredCountries[0].capital}</p>
      <p>
        population:{" "}
        {new Intl.NumberFormat().format(filteredCountries[0].population)}
      </p>
      <h3>languages</h3>
      <ul>{formatLanguages(filteredCountries[0].languages)}</ul>
      <img
        src={filteredCountries[0].flags.svg}
        alt={filteredCountries[0].flags.alt}
        style={{ width: "200px", border: "1px solid black" }}
      />
    </>
  );
};
const TenCountries = ({ filteredCountries, setSearchedCountries }) => {
  return (
    <>
      {filteredCountries.map((country, index) => (
        <p key={index}>
          {country.name.common}{" "}
          <button
            onClick={() => {
              setSearchedCountries(country.name.common);
            }}
          >
            show
          </button>
        </p>
      ))}
    </>
  );
};
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState("");

  useEffect(() => {
    axious
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleChange = (event) => {
    setSearchedCountries(event.target.value);
  };
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchedCountries.toLowerCase())
  );
  const formatLanguages = (languages) => {
    let languageArray = [];
    for (const language in languages) {
      languageArray.push(languages[language]);
    }
    const languageList = languageArray.map((language, index) => (
      <li key={index}>{language}</li>
    ));

    return languageList;
  };
  return (
    <>
      <p style={{ display: "inline" }}>find countries:</p>
      <input type="text" onChange={handleChange} />
      <br />
      {searchedCountries && filteredCountries.length > 10 ? (
        "Too many matches, specify another filter"
      ) : searchedCountries &&
        filteredCountries.length < 10 &&
        filteredCountries.length > 1 ? (
        <TenCountries
          filteredCountries={filteredCountries}
          setSearchedCountries={setSearchedCountries}
        />
      ) : (
        searchedCountries &&
        filteredCountries.length === 1 && (
          <Country
            filteredCountries={filteredCountries}
            formatLanguages={formatLanguages}
          />
        )
      )}
    </>
  );
};
export default App;
