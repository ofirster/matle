import React, { useState } from 'react';
import GuessSquare from './GuessSquare';

// Organize pieces by color for better structure
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
  { piece: '', label: 'Empty' },

];

const PieceSelector = () => {
  const [lastClicked, setLastClicked] = useState(null);

  // Handle click on GuessSquare, update the last clicked piece
  const handleGuessSquareClick = (piece) => {
    setLastClicked(piece);
  };

  // Render pieces as buttons or clickable elements
  const renderPiece = (pieceInfo) => (
    <GuessSquare 
      key={pieceInfo.piece} 
      piece={pieceInfo.piece} 
      onClick={handleGuessSquareClick} 
      isLastClicked={pieceInfo.piece === lastClicked} // Pass whether this is the last clicked
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
      <div>Last clicked: {lastClicked}</div>
    </div>
  );
};

export default PieceSelector;
