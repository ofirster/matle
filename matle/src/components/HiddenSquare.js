import React, { useState } from 'react';
import getPiece from '../utils/PieceGenerator';

const HiddenSquare = ({ squareName, isWhite, correctPiece, onPieceDrop, status }) => {
  const [currentPiece, setCurrentPiece] = useState('');

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
      onDrop={handleDrop} 
      onDragOver={handleDragOver}
      className={`box hidden ${isWhite ? 'white' : 'black'} ${status}`}>
      {currentPiece && getPiece(currentPiece)}
    </div>
  );
};

export default HiddenSquare;
