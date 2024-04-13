import React, { useState } from 'react';
import getPiece from '../utils/PieceGenerator';

function isWhiteSquare(square) {
  // Letters a to h on the chess board
  const letters = 'abcdefgh';
  // Numbers 1 to 8 on the chess board
  const numbers = '12345678';

  if (square.length !== 2) {
      return false; // Invalid input
  }

  const letter = square[0];
  const number = square[1];

  if (!letters.includes(letter) || !numbers.includes(number)) {
      return false; // Invalid square
  }

  // Calculate index positions
  const letterIndex = letters.indexOf(letter);
  const numberIndex = numbers.indexOf(number);

  // Determine color of the square
  // A square is white if the sum of its indexes is even
  return (letterIndex + numberIndex) % 2 === 0;
}


const GuessBox = ({ squareName, onClick,lastClicked, onPieceDrop, status}) => {

  const isWhite=!isWhiteSquare(squareName)
  const labelClass = isWhite ? 'hidden-black-label' : 'hidden-white-label'; // Set label color to be opposite of square color

  return (
    <div 
      className={`guess-box box hidden ${isWhite ? 'white' : 'black'} ${status} ${lastClicked ? 'last-clicked' : ''}`}>
        <label className={labelClass}>{squareName}</label>
    </div>
    
  );
};

export default GuessBox;
