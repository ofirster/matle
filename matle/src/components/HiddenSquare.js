import React, { useState } from 'react';
import getPiece from '../utils/PieceGenerator';

const HiddenSquare = ({squareName, isWhite, correctPiece, onPieceDrop }) => {
  const [currentPiece, setCurrentPiece] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const guessedPiece = e.dataTransfer.getData('piece');
    // Assuming the piece identifier is correctly retrieved, update the component state
    setCurrentPiece(guessedPiece);
    // Optionally, call the parent component's callback to notify about the drop
    if(onPieceDrop)
     onPieceDrop(squareName,guessedPiece);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // This is necessary to allow dropping
  };


  
  return (
    <div 
      onDrop={handleDrop} 
      onDragOver={handleDragOver}
      className={`box hidden ${isWhite ? 'white' : 'black'}`}>
      {currentPiece && getPiece(currentPiece)}
    </div>
  );
};

export default HiddenSquare;
