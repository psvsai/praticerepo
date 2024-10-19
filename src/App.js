import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './Style.css';
import WeatherWidget from './Components/WeatherWidget';
import SearchResults from './Components/SearchResults';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState('');
  const [background, setBackground] = useState('default');
  const [suggestions, setSuggestions] = useState([]);
  const [cities, setCities] = useState([
    
  ]);

  useEffect(() => {
    if (weatherData) {
      const weatherCondition = weatherData.weather[0].main.toLowerCase();
      switch (weatherCondition) {
        case 'clear':
          setBackground('sunny');
          break;
        case 'rain':
        case 'drizzle':
          setBackground('rainy');
          break;
        case 'clouds':
          setBackground('cloudy');
          break;
        default:
          setBackground('default');
      }
    }
  }, [weatherData]);

  const fetchWeather = async (city) => {
    const API_KEY = '2dcc6cc68e58be90a7522b4fda85d1af';
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setSuggestions([]);
    } catch (error) {
      console.error("City not found", error);
    }
  };

  const handleSearch = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (e.key === 'Enter') {
      fetchWeather(input);
    } else {
      const filteredCities = cities.filter(city =>
        city.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filteredCities);
    }
  };

  const handleCitySelect = (city) => {
    setQuery(city);
    fetchWeather(city);
  };

  return (
    <div className={`app-container ${background}`}>
      <header className="app-header">
        <center>
          <h1 className="app-title">WeatherApp</h1>
        </center>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search City..."
            value={query}
            onChange={handleSearch}
            onKeyPress={handleSearch}
          />
          <button className="enter-btn" onClick={() => fetchWeather(query)}>
            Enter
          </button>
        </div>
      </header>

      {suggestions.length > 0 && (
        <SearchResults suggestions={suggestions} onSelect={handleCitySelect} />
      )}

      {weatherData && <WeatherWidget weather={weatherData} />}

      <footer className="app-footer">
        <p>© 2024 WeatherApp</p>
        <>All rights are deserved by human beings</>
      </footer>
    </div>
  );
}

export default App;
