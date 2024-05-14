// GuessSquare.js
import React from "react";
import getPiece from "../utils/PieceGenerator";

const GuessSquare = ({ piece, onClick, isLastClicked, selectedSquare }) => {
  function handleOnDrag(e) {
    e.dataTransfer.setData("piece", piece);
  }

  return (
    <div
      className={`guess-square ${isLastClicked || selectedSquare ? "last-clicked" : ""}`}
      draggable
      onClick={() => onClick(piece)}
      onDragStart={(e) => handleOnDrag(e)}
    >
      {getPiece(piece)}
    </div>
  );
};

export default GuessSquare;