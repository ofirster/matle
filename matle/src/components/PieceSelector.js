import React from 'react';
import GuessSquare from './GuessSquare';

// Organize pieces by color for better structure
const whitePieces = [
  { piece: 'wk', label: 'White King' },
  { piece: 'wq', label: 'White Queen' },
  { piece: 'wr', label: 'White Rook' },
  { piece: 'wb', label: 'White Bishop' },
  { piece: 'wn', label: 'White Knight' },
  { piece: 'wp', label: 'White Pawn' },
  { piece: null, label: 'Empty' },
];

const blackPieces = [
  { piece: 'bk', label: 'Black King' },
  { piece: 'bq', label: 'Black Queen' },
  { piece: 'br', label: 'Black Rook' },
  { piece: 'bb', label: 'Black Bishop' },
  { piece: 'bn', label: 'Black Knight' },
  { piece: 'bp', label: 'Black Pawn' },
  { piece: null, label: 'Empty' },

];

const PieceSelector = ({ onSelect }) => {
    
  // Render pieces as buttons or clickable elements
  const renderPiece = (pieceInfo) => (
    <GuessSquare key={pieceInfo.piece} piece={pieceInfo.piece} onClick={() => onSelect(pieceInfo.piece)} />
  );

  return (
    <div className="piece-selector">
      <div className="white-pieces">
        {whitePieces.map(renderPiece)}
      </div>
      <div className="black-pieces">
        {blackPieces.map(renderPiece)}
      </div>
    </div>
  );
};

export default PieceSelector;
