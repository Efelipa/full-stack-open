import { useEffect, useState } from 'react';
import axios from 'axios';
import { CountriesToDisplay } from './components/CountriesToDisplay';
import { SearchCountry } from './components/SearchCountry';
import './App.css';



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
      <SearchCountry search={search} setSearch={setSearch} handleChange={handleChange}/>
      <div className='display'>
        <CountriesToDisplay countriesAllowed={countriesAllowed} setSearch={setSearch} search={search}/>
      </div>
    </main>
  );
}

export default App;
