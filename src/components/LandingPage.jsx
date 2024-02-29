// LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const onStart = () => {
    navigate('/city-selection');
  };

  return (
    <div className="container">
      <h1>Welcome to the Criminal Capture Game</h1>
      <button className="button" onClick={onStart}>
        Start Game
      </button>
    </div>
  );
};

export default LandingPage;
