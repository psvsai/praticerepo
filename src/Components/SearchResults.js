import React from 'react';
import './SearchResults.css';
import './ResponsiveDesign.css';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Icon library

const SearchResults = ({ suggestions, onSelect }) => {
  return (
    <div className="search-results">
      {suggestions.map((city, index) => (
        <div key={index} className="search-result-item" onClick={() => onSelect(city)}>
          <FaMapMarkerAlt className="result-icon" />
          <p className="city-name">{city}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
