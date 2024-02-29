// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CitySelection from './components/CitySelection';
import VehicleSelection from './components/VehicleSelection';
import ResultPage from './components/ResultPage';
import './App.css'; 


const App = () => {
  const [copData, setCopData] = useState([]);

  const handleAllCitiesSelected = (cities) => {
    // Logic to update copData with selected cities
    setCopData((prevCopData) => [...prevCopData, { cities }]);
  };

  const handleAllVehiclesSelected = (vehicles) => {
    // Logic to update copData with selected vehicles
    setCopData((prevCopData) => [
      ...prevCopData.map((cop) => ({ ...cop, vehicles })),
    ]);
  };

  const handleRestartGame = () => {
    // Logic to reset the game state or navigate to the landing page
    setCopData([]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/city-selection"
          element={<CitySelection onAllCitiesSelected={handleAllCitiesSelected} />}
        />
        <Route
          path="/vehicle-selection"
          element={<VehicleSelection onAllVehiclesSelected={handleAllVehiclesSelected} />}
        />
        <Route
          path="/result"
          element={<ResultPage copData={copData} onRestartGame={handleRestartGame} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
