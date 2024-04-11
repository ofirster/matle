import React from 'react';
import getPiece from '../utils/PieceGenerator'; // Adjusted import

const BoardSquare = ({squareName, isWhite, piece, onClick }) => {

  const labelClass = isWhite ? 'black-label' : 'white-label'; // Set label color to be opposite of square color

  const labels = (
    <>
      {squareName.charAt(0)==='h' && <div className={`label top-right ${labelClass}`}>{squareName.charAt(1)}</div>} 
      {squareName.charAt(1)==='1' && <div className={`label bottom-left ${labelClass}`}>{squareName.charAt(0)}</div>} 
    </>
  );
  
  
  return <div
  onClick={onClick}
  className={`box ${
    isWhite?  "white" : "black"}` }>
    <div className={`square ${isWhite ? 'white' : 'black'}`}>
      {getPiece(piece)}
      {labels}
    </div>

</div>
};

export default BoardSquare;
