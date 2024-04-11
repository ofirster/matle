import React, { useState } from 'react';
import getPiece from '../utils/PieceGenerator';

const HiddenSquare = ({ squareName, isWhite, onClick,lastClicked, onPieceDrop, status}) => {
  // Use state to manage the current piece in the hidden square
  const [currentPiece, setCurrentPiece] = useState('');


  const handleOnClick = () => {
    onClick();
    setCurrentPiece(lastClicked);
  };


  const handleDrop = (e) => {
    e.preventDefault();
    const guessedPiece = e.dataTransfer.getData('piece');
    setCurrentPiece(guessedPiece);
    if (onPieceDrop) onPieceDrop(squareName, guessedPiece);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      onClick={handleOnClick} // Apply the onClick handler
      onDrop={handleDrop} 
      onDragOver={handleDragOver}
      className={`box hidden ${isWhite ? 'white' : 'black'} ${status}`}>
      {currentPiece && getPiece(currentPiece)}
    </div>
  );
};

export default HiddenSquare;
