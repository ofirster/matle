import React from 'react';
import getPiece from '../utils/PieceGenerator'; // Adjusted import

const GuessSquare = ({piece, isWhite, onClick }) => {

  return <div
  onClick={onClick}
  className={`guess-square` }>
<div>
  {
    getPiece(piece)
  }
</div>

</div>
};

export default GuessSquare;
