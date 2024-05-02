// GuessSquare.js
import React from 'react';
import getPiece from '../utils/PieceGenerator';

const PieceKey = ({ piece, onClick, isLastClicked }) => {
  function handleOnDrag(e) {
    e.dataTransfer.setData("piece", piece);
  }
  
  return (
    <div 
      className={`key`} 
    >
      {getPiece(piece)}
    </div>
  );
};

export default PieceKey;
