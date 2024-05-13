import React, { useState } from "react";
import PieceSelector from "./PieceSelector";
import HiddenSquare from "./HiddenSquare";
import BoardSquare from "./BoardSquare";
import GuessTable from "./GuessTable";

const Chessboard = ({ chessBoard, hiddenSquares }) => {
  const guessesAllowed = 5;

  // Initialize guesses state with an array containing an object for the first guess
  const [guesses, setGuesses] = useState([
    hiddenSquares.reduce((acc, cur) => ({ ...acc, [cur]: null }), {}),
  ]);
  // Initialize an array to track the results of each guess
  const [guessesResults, setGuessesResults] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null); // State to track the last clicked piece from PieceSelector
  const [selectedSquare, setSelectedSquare] = useState(null);

  // Function to handle piece selection update from PieceSelector
  const handlePieceSelect = (pieceCode) => {
    if (selectedSquare !== null) {
      setSelectedPiece(pieceCode);
      let res = onPieceAssign(selectedSquare, pieceCode);
      setSelectedPiece(null);
      setSelectedSquare(null);
    } else {
      setSelectedPiece(pieceCode == selectedPiece ? null : pieceCode);
    }
  };
  const onHiddenSquareSelected = (squareName) => {
    setSelectedSquare(squareName !== selectedSquare ? squareName : null);
  };
  const onHiddenSquareClick = (squareName) => {
    if (selectedPiece !== null) {
      return onPieceAssign(squareName, selectedPiece);
    } else {
      return onHiddenSquareSelected(squareName);
    }
  };
  const getPieceBySquareName = (squareName) => {
    const columnIndex = squareName.charCodeAt(0) - "a".charCodeAt(0);
    const rowIndex = 8 - parseInt(squareName[1], 10);
    let res = chessBoard[rowIndex][columnIndex];
    if (res === "") res = "empty";
    return res;
  };

  const isGuessDisabled = () => {
    return (
      guesses.length > guessesAllowed ||
      !isEveryHiddenSquareFilled() ||
      selectedPiece !== null
    );
  };
  const isEveryHiddenSquareFilled = () => {
    const lastGuess = guesses[guesses.length - 1];
    return hiddenSquares.every((square) => lastGuess[square] !== null);
  };

  const onGuessClick = () => {
    if (!isEveryHiddenSquareFilled()) {
      return; // Prevent guessing unless all squares are filled
    }
    let newGuessResults = {};
    let validGuess = true; // Assume the guess is valid for simplicity
    if (validGuess) {
      const lastGuess = guesses[guesses.length - 1];
      hiddenSquares.forEach((squareName) => {
        const guessedPiece = lastGuess[squareName];
        const correctPiece = getPieceBySquareName(squareName);
        const hiddenPieces = hiddenSquares.map((x) => getPieceBySquareName(x));

        if (correctPiece === guessedPiece) {
          newGuessResults[squareName] = "correct-position";
        } else if (hiddenPieces.includes(guessedPiece)) {
          newGuessResults[squareName] = "wrong-position";
        } else {
          newGuessResults[squareName] = "incorrect";
        }
      });

      // Append the results of the current guess
      setGuessesResults([...guessesResults, newGuessResults]);

      // Prepare for a new guess, initializing it with the state of the last guess
      setGuesses([...guesses, { ...lastGuess }]);
    }
  };

  const onPieceAssign = (squareName, pieceCode) => {
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[newGuesses.length - 1] = {
        ...newGuesses[newGuesses.length - 1],
        [squareName]: pieceCode,
      };
      return newGuesses;
    });
    setSelectedPiece(null);
  };

  // Function to retrieve the guess result for a specific square
  const getGuessResult = (squareName) => {
    return guessesResults.length > 0
      ? guessesResults[guessesResults.length - 1][squareName]
      : undefined;
  };

  return (
    <>
      <div className="chessboard-container">
        {chessBoard.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((piece, colIndex) => {
              const squareName =
                String.fromCharCode(97 + colIndex) + (8 - rowIndex);
              const isHidden = hiddenSquares.includes(squareName);
              const isWhite = (rowIndex + colIndex) % 2 === 0;
              const status = getGuessResult(squareName);

              if (isHidden) {
                return (
                  <HiddenSquare
                    squareName={squareName}
                    correctPiece={piece}
                    isWhite={isWhite}
                    onPieceDrop={onPieceAssign}
                    status={status}
                    onClick={() => {
                      return onHiddenSquareClick(squareName);
                    }}
                    lastClicked={selectedPiece}
                    selectedPiece={
                      guesses[guesses.length - 1][squareName] ?? null
                    }
                    isSelected={selectedSquare === squareName}
                    key={squareName}
                  />
                );
              } else {
                return (
                  <BoardSquare
                    squareName={squareName}
                    piece={piece}
                    isWhite={isWhite}
                    key={squareName}
                  />
                );
              }
            })}
          </div>
        ))}
      </div>
      <PieceSelector
        onSelect={handlePieceSelect}
        lastClicked={selectedPiece}
        setLastClicked={setSelectedPiece}
        selectedSquare={selectedSquare}
      />
      <div class="guess-button-container">
        <button
          className="guess-button"
          onClick={onGuessClick}
          disabled={isGuessDisabled()}
        >
          Guess!
        </button>
      </div>
      <label>
        Guess Left: {Math.max(0, guessesAllowed - guessesResults.length)}/
        {guessesAllowed}
      </label>
    </>
  );
};

export default Chessboard;
