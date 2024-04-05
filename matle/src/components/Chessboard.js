import React, { useState } from 'react';
import PieceSelector from './PieceSelector';
import HiddenSquare from './HiddenSquare';
import BoardSquare from './BoardSquare';
import GuessSquare from './GuessSquare';

const Chessboard = ({chessBoard,hiddenSquares}) => {


  const [selectedSquare, setSelectedSquare] = useState(null);
  const [showPieceSelector, setShowPieceSelector] = useState(false);

  const handleSquareClick = (squareName) => {
    setSelectedSquare(squareName);
    setShowPieceSelector(true);
  };

  const handlePieceSelection = (piece) => {
    console.log(`Piece ${piece} selected for square ${selectedSquare}`);
    // Here, you should update the board state based on the piece selection.
    setShowPieceSelector(false);
  };

  return (
    <>
      {chessBoard.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((piece, colIndex) => {
            const squareName = String.fromCharCode(97 + colIndex) + (8-rowIndex);
            const isHidden = hiddenSquares.includes(squareName);
            const isWhite=(rowIndex + colIndex) % 2 === 0;

            if(isHidden)
              return <HiddenSquare piece={piece} isWhite={isWhite} onClick={()=>handleSquareClick(squareName)}></HiddenSquare>;
            else
             return <BoardSquare piece={piece} isWhite={isWhite} ></BoardSquare>;
          })}
        </div>
      ))}

    </>
  );
};

export default Chessboard;
