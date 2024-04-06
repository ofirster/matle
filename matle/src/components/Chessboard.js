import React, { useState } from 'react';
import PieceSelector from './PieceSelector';
import HiddenSquare from './HiddenSquare';
import BoardSquare from './BoardSquare';

const Chessboard = ({ chessBoard, hiddenSquares }) => {
  // Initialize guesses state with an array containing an object for the first guess
  const [guesses, setGuesses] = useState([hiddenSquares.reduce((acc, cur) => ({...acc, [cur]: null}), {})]);
  // Initialize an array to track the results of each guess
  const [guessesResults, setGuessesResults] = useState([]);

  const getPieceBySquareName = (squareName) => {
    const columnIndex = squareName.charCodeAt(0) - 'a'.charCodeAt(0);
    const rowIndex = 8 - parseInt(squareName[1], 10);
    return chessBoard[rowIndex][columnIndex];
  };

  const onGuessClick = () => {
    let newGuessResults = {};
    let validGuess = true; // Assume the guess is valid for simplicity
    if (validGuess) {
      const lastGuess = guesses[guesses.length - 1];
      hiddenSquares.forEach(squareName => {
        const guessedPiece = lastGuess[squareName];
        const correctPiece = getPieceBySquareName(squareName);
        const hiddenPieces = hiddenSquares.map(x => getPieceBySquareName(x));

        if (correctPiece === guessedPiece) {
          newGuessResults[squareName] = "green";
        } else if (hiddenPieces.includes(guessedPiece) && guessedPiece !== null) {
          newGuessResults[squareName] = "yellow";
        } else {
          newGuessResults[squareName] = "gray";
        }
      });
      // Append the results of the current guess
      setGuessesResults([...guessesResults, newGuessResults]);

      // Prepare for a new guess, initializing it with the state of the last guess
      setGuesses([...guesses, {...lastGuess}]);
    }
  };

  const onPieceDrop = (squareName, pieceCode) => {
    setGuesses(prevGuesses => {
      const newGuesses = [...prevGuesses];
      newGuesses[newGuesses.length - 1] = { ...newGuesses[newGuesses.length - 1], [squareName]: pieceCode };
      return newGuesses;
    });
  };

  // Function to retrieve the guess result for a specific square
  const getGuessResult = (squareName) => {
    return guessesResults.length > 0 ? guessesResults[guessesResults.length - 1][squareName] : undefined;
  };

  return (
    <>
      {chessBoard.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((piece, colIndex) => {
            const squareName = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
            const isHidden = hiddenSquares.includes(squareName);
            const isWhite = (rowIndex + colIndex) % 2 === 0;
            const status = getGuessResult(squareName); // Retrieve the latest guess result for this square

            if (isHidden) {
              return <HiddenSquare
                squareName={squareName}
                correctPiece={piece}
                isWhite={isWhite}
                onPieceDrop={onPieceDrop}
                status={status}
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
