import React from 'react';

import WhiteKing from './Pieces/WhiteKing';
import WhiteQueen from './Pieces/WhiteQueen';
import WhiteRook from './Pieces/WhiteRook';
import WhiteKnight from './Pieces/WhiteKnight';
import WhiteBishop from './Pieces/WhiteBishop';
import WhitePawn from './Pieces/WhitePawn';

import BlackKing from './Pieces/BlackKing';
import BlackQueen from './Pieces/BlackQueen';
import BlackRook from './Pieces/BlackRook';
import BlackKnight from './Pieces/BlackKnight';
import BlackBishop from './Pieces/BlackBishop';
import BlackPawn from './Pieces/BlackPawn';


const getPiece = (piece) =>{

  switch(piece)
  {
case "bb":
  return <BlackBishop/>;
case "bk":
  return <BlackKing/>;
case "bknight":
  return <BlackKnight/>;
case "bp":
  return <BlackPawn/>;
case "bq":
  return <BlackQueen/>;
case "br":
  return <BlackRook/>;
case "wb":
  return <WhiteBishop/>;
case "wk":
  return <WhiteKing/>;
case "wknight":
  return <WhiteKnight/>;
case "wp":
  return <WhitePawn/>;
case "wq":
  return <WhiteQueen/>;
case "wr":
  return <WhiteRook/>;
  default:
    return;
  }
}
const Square = ({key,isWhite, isHidden, piece }) => {

  return <div
  className={`box ${
    isHidden ? "hidden" : isWhite?  "white" : "black"}`}>
<div>
  {
    piece!=null && !isHidden &&  getPiece(piece)
  }
</div>

</div>
};

export default Square;
