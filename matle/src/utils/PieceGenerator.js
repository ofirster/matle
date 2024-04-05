
import WhiteKing from '../components/Pieces/WhiteKing';
import WhiteQueen from '../components/Pieces/WhiteQueen';
import WhiteRook from '../components/Pieces/WhiteRook';
import WhiteKnight from '../components/Pieces/WhiteKnight';
import WhiteBishop from '../components/Pieces/WhiteBishop';
import WhitePawn from '../components/Pieces/WhitePawn';

import BlackKing from '../components/Pieces/BlackKing';
import BlackQueen from '../components/Pieces/BlackQueen';
import BlackRook from '../components/Pieces/BlackRook';
import BlackKnight from '../components/Pieces/BlackKnight';
import BlackBishop from '../components/Pieces/BlackBishop';
import BlackPawn from '../components/Pieces/BlackPawn';


const getPiece = (piece) =>{

  switch(piece)
  {
case "bb":
  return <BlackBishop/>;
case "bk":
  return <BlackKing/>;
case "bn":
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
case "wn":
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

export default getPiece;