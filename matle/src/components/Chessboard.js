import React, { useState } from "react";
import PieceSelector from "./PieceSelector";
import HiddenSquare from "./HiddenSquare";
import BoardSquare from "./BoardSquare";
import GuessTable from "./GuessTable";

const Chessboard = ({ chessBoard, hiddenSquares }) => {
  const guessesAllowed = 50;

  const [guesses, setGuesses] = useState([
    hiddenSquares.reduce((acc, cur) => ({ ...acc, [cur]: null }), {}),
  ]);

  const [guessesResults, setGuessesResults] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handlePieceSelect = (pieceCode) => {
    if (selectedSquare !== null) {
      setSelectedPiece(pieceCode);
      onPieceAssign(selectedSquare, pieceCode);
      setSelectedPiece(null);
      setSelectedSquare(null);
    } else {
      setSelectedPiece(pieceCode === selectedPiece ? null : pieceCode);
    }
  };

  const onHiddenSquareSelected = (squareName) => {
    setSelectedSquare(squareName !== selectedSquare ? squareName : null);
  };

  const onHiddenSquareClicked = (squareName) => {
    if (selectedPiece !== null) {
      return onPieceAssign(squareName, selectedPiece);
    } else {
      if (guesses[guesses.length - 1][squareName] !== null)
        return onPieceAssign(squareName, null);
      else return onHiddenSquareSelected(squareName);
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
      return;
    }
    let newGuessResults = {};
    let validGuess = true;
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

      setGuessesResults([...guessesResults, newGuessResults]);
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

  const getGuessResult = (squareName) => {
    const res =
      guessesResults.length > 0
        ? guessesResults[guessesResults.length - 1][squareName]
        : "default";
    return res;
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
                    initialStatus={status}
                    onClick={() => {
                      return onHiddenSquareClicked(squareName);
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
      <div className="guess-button-container">
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
