import React, { useState } from 'react';
import PieceSelector from './PieceSelector';
import HiddenSquare from './HiddenSquare';
import BoardSquare from './BoardSquare';
import GuessSquare from './GuessSquare';


const Chessboard = ({chessBoard,hiddenSquares}) => {

  
  const getPieceBySquareName = (squareName) =>
  {
    const columnIndex = squareName.charCodeAt(0) - 'a'.charCodeAt(0);
    const rowIndex = 8 - parseInt(squareName[1]);
    return chessBoard[rowIndex][columnIndex];
  }
  // const [guesses, setGuesses] = useState({}); // Store guesses as { 'squareName': 'pieceCode' }

  const guesses=[{}]
  const guessesResults=[{}]
  hiddenSquares.forEach(x=>guesses[0][x]=null)
  const [guessResults, setGuessResults] = useState({}); // Store results of guesses as { 'squareName': 'resultColor' }

  const onGuessClick = () =>
  {
    let validGuess = true;
    if(validGuess)
  {
    const hiddenPieces=hiddenSquares.map(x=>getPieceBySquareName(x));
    hiddenSquares.forEach(squareName => {
      const lastGuess = guesses[guesses.length-1]
      let status="gray";
      const guessedPiece=lastGuess[squareName];
      const correctPiece=getPieceBySquareName(squareName);
      if(correctPiece===guessedPiece)
        status="green";
      else if(hiddenPieces.includes(guessResults))
        status="yellow"
      guessesResults[guessesResults.length-1][squareName]=status;
      
    });
  }
  }
   // Function to update guesses when a piece is dropped
   const onPieceDrop = (squareName, pieceCode) => {
    guesses[guesses.length-1][squareName]=pieceCode;
  };


  // const evaluateGuesses = () => {
  //   let newGuessResults = {};
  //   // Logic to evaluate each guess
  //   Object.entries(guesses).forEach(([squareName, guessedPiece]) => {
  //     if (correctConfiguration[squareName] === guessedPiece) {
  //       newGuessResults[squareName] = 'green'; // Correct piece, correct square
  //     } else if (Object.values(correctConfiguration).includes(guessedPiece)) {
  //       newGuessResults[squareName] = 'yellow'; // Correct piece, wrong square
  //     } else {
  //       newGuessResults[squareName] = 'gray'; // Incorrect piece
  //     }
  //   });
  //   setGuessResults(newGuessResults);
  // };


  return (
    <>
      {chessBoard.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((piece, colIndex) => {
            const squareName = String.fromCharCode(97 + colIndex) + (8-rowIndex);
            const isHidden = hiddenSquares.includes(squareName);
            const isWhite=(rowIndex + colIndex) % 2 === 0;

            if(isHidden)
              return <HiddenSquare squareName={squareName} correctPiece={piece} isWhite={isWhite} onPieceDrop={onPieceDrop}></HiddenSquare>;
            else
             return <BoardSquare piece={piece} isWhite={isWhite} ></BoardSquare>;
          })}
        </div>
      ))}
      <PieceSelector></PieceSelector>
      <button className="guess-button" onClick={()=>onGuessClick()} >Guess</button>
    </>
  );
};

export default Chessboard;
