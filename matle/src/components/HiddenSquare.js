import React, { useState } from 'react';
import getPiece from '../utils/PieceGenerator';

const HiddenSquare = ({ isWhite, onPieceDrop }) => {
  const [currentPiece, setCurrentPiece] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const piece = e.dataTransfer.getData('piece');
    // Assuming the piece identifier is correctly retrieved, update the component state
    setCurrentPiece(piece);
    // Optionally, call the parent component's callback to notify about the drop
    if(onPieceDrop) onPieceDrop(piece);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // This is necessary to allow dropping
  };

  return (
    <div 
      onDrop={handleDrop} 
      onDragOver={handleDragOver}
      className={`box hidden ${isWhite ? 'white' : 'black'}`}>
      {/* Render the dropped piece using getPiece */}
      {currentPiece && getPiece(currentPiece)}
    </div>
  );
};

export default HiddenSquare;
