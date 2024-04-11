import React, { useState } from 'react';
import GuessSquare from './GuessSquare';

// Define arrays for white and black pieces
const whitePieces = [
  { piece: 'wk', label: 'White King' },
  { piece: 'wq', label: 'White Queen' },
  { piece: 'wr', label: 'White Rook' },
  { piece: 'wb', label: 'White Bishop' },
  { piece: 'wn', label: 'White Knight' },
  { piece: 'wp', label: 'White Pawn' },
  { piece: '', label: 'Empty' },
];

const blackPieces = [
  { piece: 'bk', label: 'Black King' },
  { piece: 'bq', label: 'Black Queen' },
  { piece: 'br', label: 'Black Rook' },
  { piece: 'bb', label: 'Black Bishop' },
  { piece: 'bn', label: 'Black Knight' },
  { piece: 'bp', label: 'Black Pawn' },
];

const PieceSelector = ({ onSelect }) => {
  const [lastClicked, setLastClicked] = useState(null);

  // Handler function to manage click events on GuessSquare
  const handleGuessSquareClick = (piece) => {
    setLastClicked(piece);
    onSelect(piece); // Call the passed onSelect function from parent with the selected piece
  };

  // Function to render GuessSquare components for each piece
  const renderPiece = (pieceInfo) => (
    <GuessSquare 
      key={pieceInfo.piece}
      piece={pieceInfo.piece}
      onClick={handleGuessSquareClick} // Set click handler
      isLastClicked={pieceInfo.piece === lastClicked} // Pass isLastClicked flag
    />
  );

  return (
    <div className="piece-selector">
      <div className="white-pieces">
        {whitePieces.map(renderPiece)}
      </div>
      <div className="black-pieces">
        {blackPieces.map(renderPiece)}
      </div>
      <div>Last clicked: {lastClicked}</div> {/* Optionally display the last clicked piece */}
    </div>
  );
};

export default PieceSelector;
