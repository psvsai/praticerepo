import React from 'react';
import './WeatherWidget.css';

const WeatherWidget = ({ weather }) => {
  const { name, main, weather: weatherDetails, wind } = weather;
  const { temp, humidity, feels_like, temp_min, temp_max } = main;
  const { icon, description } = weatherDetails[0];
  const { speed } = wind;

  return (
    <div className="weather-widget">
      <h2 className="city-name">{name}</h2>
      <div className="weather-content">
        <div className="weather-icon-container">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="weather-icon"
            title={description}
          />
        </div>
        <div className="weather-info">
          <p className="temperature">{Math.round(temp)}°C</p>
          <p className="feels-like">Feels like: {Math.round(feels_like)}°C</p>
          <p className="temp-range">Min: {Math.round(temp_min)}°C / Max: {Math.round(temp_max)}°C</p>
          <p className="description">{description}</p>
          <p className="humidity">Humidity: {humidity}%</p>
          <p className="wind-speed">Wind Speed: {speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
