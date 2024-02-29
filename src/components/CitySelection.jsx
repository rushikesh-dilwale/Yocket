// CitySelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import images
import YapkashnagarImage from './Images/Yapkashnagar.png';
import LihaspurImage from './Images/Lihaspur.png';
import NarmisCityImage from './Images/NarmisCity.png';
import ShekharvatiImage from './Images/Shekharvati.png';
import NuravgramImage from './Images/Nuravgram.png';

const cityImages = {
  Yapkashnagar: YapkashnagarImage,
  Lihaspur: LihaspurImage,
  NarmisCity: NarmisCityImage,
  Shekharvati: ShekharvatiImage,
  Nuravgram: NuravgramImage,
};

const cities = Object.keys(cityImages);

const CitySelection = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const navigate = useNavigate();

  const handleCitySelect = (copId, city) => {
    setSelectedCities((prevCities) => {
      const cityAlreadySelected = prevCities.some(
        (selection) => selection.copId !== copId && selection.city === city
      );

      if (!cityAlreadySelected) {
        const updatedCities = prevCities.filter(
          (selection) => selection.copId !== copId
        );
        return [...updatedCities, { copId, city }];
      }

      return prevCities;
    });
  };

  const handleNext = async () => {
    try {
      const response = await fetch('http://localhost:3001/city-selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          copId: 1, // Assuming copId is 1 for simplicity, update accordingly
          selectedCities,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit cities');
      }

      navigate('/vehicle-selection');
    } catch (error) {
      console.error('Error submitting cities:', error);
    }
  };

  const renderCitySection = (copId) => (
    <div key={copId} className="cop-section">
      <h2>Cop {copId}</h2>
      {cities.map((city) => (
        <div key={city}>
          <img
            src={cityImages[city]}
            alt={`City: ${city}`}
            style={{ width: '200px', height: '150px' }}
          />
          <label>
            <input
              type="checkbox"
              checked={selectedCities.some(
                (selection) => selection.copId === copId && selection.city === city
              )}
              onChange={() => handleCitySelect(copId, city)}
            />
            {city}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {renderCitySection(1)}
      {renderCitySection(2)}
      {renderCitySection(3)}
      <div className="next-button-container">
        <button
          className="next-button"
          onClick={handleNext}
          disabled={selectedCities.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CitySelection;
