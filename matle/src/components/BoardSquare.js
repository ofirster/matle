import React from 'react';
import getPiece from '../utils/PieceGenerator'; // Adjusted import

const BoardSquare = ({isWhite, piece, onClick }) => {

  return <div
  onClick={onClick}
  className={`box ${
    isWhite?  "white" : "black"}` }>
<div>
  {
    piece!=null && getPiece(piece)
  }
</div>

</div>
};

export default BoardSquare;
