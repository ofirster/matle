import React from 'react';
import getPiece from '../utils/PieceGenerator';

const GuessSquare = ({ piece, isWhite }) => {

  function handleOnDrag(e)
  {
    e.dataTransfer.setData("piece",piece)
  }
  
  return (
    
      <div className={`guess-square`} 
      draggable
      onDragStart={(e)=>handleOnDrag(e)}>
        {getPiece(piece)}
      </div>
  );
};

export default GuessSquare;


