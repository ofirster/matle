import React from 'react';
import getPiece from '../utils/PieceGenerator'; // Adjusted import

const HiddenSquare = ({isWhite, isHidden, piece, onClick }) => {

  return <div
  onClick={onClick}
  className={`box ${
    
    "hidden"}` }>
<div>
  {
    // piece!=null &&  !isHidden && getPiece(piece)
  }
</div>

</div>
};

export default HiddenSquare;
