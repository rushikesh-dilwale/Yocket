// ResultPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = ({ copData, onRestartGame }) => {
  const capturedCop = copData?.find((cop) => cop.captured);
  const navigate = useNavigate();

  const handleRestartGame = () => {
    // Reset the game state or perform any other necessary logic
    onRestartGame();

    // Navigate to the landing page
    navigate('/');
  };

  return (
    <div className='result-container '>
      <h2>Result Page</h2>
      {capturedCop ? (
        <p>Cop {capturedCop.id} successfully captured the Criminal!</p>
      ) : (
        <p>No cop successfully captured the Criminal. Try again!</p>
      )}
      <button className='restart-button' onClick={handleRestartGame}>Restart Game</button>
    </div>
  );
};

export default ResultPage;
