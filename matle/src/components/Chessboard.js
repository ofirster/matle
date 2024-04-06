import React, { useState } from 'react';
import PieceSelector from './PieceSelector';
import HiddenSquare from './HiddenSquare';
import BoardSquare from './BoardSquare';

const Chessboard = ({ chessBoard, hiddenSquares }) => {
  // Initialize guesses state with an object where each key is a square from hiddenSquares set to null
  const [guesses, setGuesses] = useState([hiddenSquares.reduce((acc, cur) => ({...acc, [cur]: null}), {})]);
  const [guessesResults, setGuessesResults] = useState({}); // Now an object for holding guess results

  const getPieceBySquareName = (squareName) => {
    const columnIndex = squareName.charCodeAt(0) - 'a'.charCodeAt(0);
    const rowIndex = 8 - parseInt(squareName[1], 10);
    return chessBoard[rowIndex][columnIndex];
  };

  const onGuessClick = () => {
    let newGuessesResults = {};
    let validGuess = true; // Assume the guess is valid for simplicity, validation logic to be added as needed
    if (validGuess) {
      const lastGuess = guesses[guesses.length - 1];
      hiddenSquares.forEach(squareName => {
        const guessedPiece = lastGuess[squareName];
        const correctPiece = getPieceBySquareName(squareName);
        const hiddenPieces=hiddenSquares.map(x=>getPieceBySquareName(x));


        if (correctPiece === guessedPiece) {
          newGuessesResults[squareName] = "green";
        } else if (hiddenPieces.includes(guessedPiece)) {
          newGuessesResults[squareName] = "yellow";
        } else {
          newGuessesResults[squareName] = "gray";
        }
      });
      setGuessesResults(newGuessesResults); // Update state with new results
    }

    // Optionally, prepare for a new guess
    setGuesses([...guesses, hiddenSquares.reduce((acc, cur) => ({...acc, [cur]: null}), {})]);
  };

  const onPieceDrop = (squareName, pieceCode) => {
    // Only update the state if there's at least one guess in the history
    if (guesses.length > 0) {
      setGuesses(prevGuesses => {
        // Take all but the last guess as is, we're going to modify the last guess
        const allButLast = prevGuesses.slice(0, -1);
  
        // Copy the last guess object and update it with the new piece code for the dropped piece
        const lastGuessUpdated = {
          ...prevGuesses[prevGuesses.length - 1],
          [squareName]: pieceCode,
        };
  
        // Return the new array of guesses with the updated last guess
        return [...allButLast, lastGuessUpdated];
      });
    }
  };
  

  return (
    <>
      {chessBoard.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((piece, colIndex) => {
            const squareName = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
            const isHidden = hiddenSquares.includes(squareName);
            const isWhite = (rowIndex + colIndex) % 2 === 0;
            const status = guessesResults[squareName]; // Retrieve status for this square

            if (isHidden) {
              return <HiddenSquare
                squareName={squareName}
                correctPiece={piece}
                isWhite={isWhite}
                onPieceDrop={onPieceDrop}
                status={status} // Pass status as a prop
                key={squareName}
              />;
            } else {
              return <BoardSquare piece={piece} isWhite={isWhite} key={squareName} />;
            }
          })}
        </div>
      ))}
      <PieceSelector />
      <button className="guess-button" onClick={onGuessClick}>Guess</button>
    </>
  );
};

export default Chessboard;
