import { useEffect, useState } from "react";
import axios from "axios";

export const CountriesToDisplay = ({countriesAllowed, search, setSearch}) => {
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
                {(weather.success === false)
                ? <p>Cannot connect to the server.</p>
                : <>
                    <p><strong>Temperature:</strong> {weather.current.temperature} Celcius</p>
                    <img src={weather.current.weather_icons} alt={weather.current.weather_description}/>
                    <p><strong>Wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
                    </>
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

