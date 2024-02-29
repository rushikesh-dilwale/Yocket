// VehicleSelection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import vehicle images
import EVBikeImage from './Image2/EvBike.png';
import EVCarImage from './Image2/EvCar.png';
import EVSUVImage from './Image2/EvSuv.png';

const vehicleImages = {
  'EV Bike': EVBikeImage,
  'EV Car': EVCarImage,
  'EV SUV': EVSUVImage,
};

const VehicleSelection = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const navigate = useNavigate();

  const handleVehicleSelect = async () => {
    try {
      const response = await fetch('http://localhost:3001/vehicle-selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          copId: 1, // Assuming copId is 1 for simplicity, update accordingly
          selectedVehicle,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vehicle');
      }

      navigate('/result');
    } catch (error) {
      console.error('Error submitting vehicle:', error);
    }
  };

  return (
    <div>
      <h2>Vehicle Selection</h2>
      {Object.keys(vehicleImages).map((vehicle) => (
        <div key={vehicle}>
          <img
            src={vehicleImages[vehicle]}
            alt={`Vehicle: ${vehicle}`}
            style={{ width: '200px', height: '150px' }}
          />
          <label>
            <input
              type="checkbox"
              value={vehicle}
              checked={selectedVehicle === vehicle}
              onChange={() => setSelectedVehicle(vehicle)}
            />
            {vehicle}
          </label>
        </div>
      ))}
      <div className="next-button-container">
        <button
          className="next-button"
          onClick={handleVehicleSelect}
          disabled={!selectedVehicle}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VehicleSelection;
