import React, { useState } from 'react';
import getPiece from '../utils/PieceGenerator';

const HiddenSquare = ({ squareName, isWhite, onClick,lastClicked, onPieceDrop, status}) => {

  const labelClass = isWhite ? 'hidden-black-label' : 'hidden-white-label'; // Set label color to be opposite of square color

  const labels = (
    <>
      {squareName.charAt(0)==='h' && <div className={`label top-right ${labelClass}`}>{squareName.charAt(1)}</div>} 
      {squareName.charAt(1)==='1' && <div className={`label bottom-left ${labelClass}`}>{squareName.charAt(0)}</div>} 
    </>
  );

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
      className={`box hidden ${isWhite ? 'white' : 'black'} ${status} ${lastClicked ? 'last-clicked' : ''}`}>
      {currentPiece && getPiece(currentPiece)}
      {labels}
      {!currentPiece && <label className={labelClass}>{squareName}</label>}
    </div>
    
  );
};

export default HiddenSquare;
