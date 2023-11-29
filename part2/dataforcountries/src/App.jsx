import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// Component
const CountriesToDisplay = ({countriesAllowed, search, setSearch}) => {
  // States var
  const [weather, setWeather] = useState([]);

  // API key
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${search}`;
  
  // Button Handler
  const showCountry = (handleEvent) => (e) => {
    handleEvent(e.target.value)
  }

  // Effect Hook
  const weatherHook = () => {
    axios.get(API)
      .then(res => {
        setWeather(res.data)
      })
  }
  useEffect(weatherHook, [API])

  // Display conditions
  if(countriesAllowed.length > 10) {
    return (
      <p>Specify the country.</p>
    )
  }
  if(countriesAllowed.length === 0) {
    return (
      <p>No countries found.</p>
    )
  }
  if(countriesAllowed.length === 1) {
    return (
      countriesAllowed.map(country => {
        return (
          <div className='display' key={parseInt(country.ccn3)}>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>
              {country.languages && Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common + ' Flag'} />
            <div className="weather">
              <h2>Weather in {country.capital}</h2>
              {console.log(weather)}
              {(weather.success === false)
              ? <p>Cannot connect to the server.</p>
              : <p><strong>Temperature</strong></p>
              }
            </div>
          </div>
        )
      })
    )
  }
  if(countriesAllowed.length <= 10) {
    return (
      <ul>
        {countriesAllowed.map((country) => {
          return (
            <li key={parseInt(country.ccn3)}>
              {country.name.common} {country.cca2}
              <button onClick={showCountry(setSearch)} value={country.name.common.toLowerCase().trim()}>show</button>
            </li>
          )}
        )}
      </ul>
    )
  }
}

function App() {

  // State vars
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  // API Connection
  const API_COUNTRY = `https://restcountries.com/v3.1/all`;

  
  // Handle change
  const handleChange = (handleEvent) => (e) => {
    handleEvent(e.target.value);
  }

  // Hook handler
  const hook = () => {
    axios.get(API_COUNTRY)
      .then(res => {
        setCountries(res.data)
      })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(hook, [])
  
  //  Filtered countries
  let normalizerArr = [];
  const countriesAllowed = (!search)
  ? normalizerArr
  : countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()));

  

  return (
    <main>
      <div className="search">
        Find countries: 
        <input type="text" value={search} onChange={handleChange(setSearch)}/>
      </div>
      <div className="display">
        <CountriesToDisplay countriesAllowed={countriesAllowed} setSearch={setSearch} search={search}/>
      </div>
    </main>
  );
}

export default App;
