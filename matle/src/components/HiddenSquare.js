import React, { useState, useEffect } from "react";
import getPiece from "../utils/PieceGenerator";

const HiddenSquare = ({
  squareName,
  isWhite,
  onClick,
  onPieceDrop,
  status,
  selectedPiece,
  lastClicked,
  isSelected,
}) => {
  const labelClass = isWhite ? "hidden-black-label" : "hidden-white-label";

  const labels = (
    <>
      {squareName.charAt(1) === "1" && (
        <div className={`label bottom-left ${labelClass}`}>
          {squareName.charAt(0)}
        </div>
      )}
      {squareName.charAt(0) === "h" && (
        <div className={`label top-right ${labelClass}`}>
          {squareName.charAt(1)}
        </div>
      )}
    </>
  );

  const [currentPiece, setCurrentPiece] = useState(selectedPiece);

  // Update the currentPiece whenever selectedPiece changes
  useEffect(() => {
    setCurrentPiece(selectedPiece);
  }, [selectedPiece]);

  const handleOnClick = () => {
    onClick();
    setCurrentPiece(lastClicked);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const guessedPiece = e.dataTransfer.getData("piece");
    setCurrentPiece(guessedPiece);
    if (onPieceDrop) onPieceDrop(squareName, guessedPiece);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onClick={handleOnClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`box hidden ${isWhite ? "white" : "black"} ${status} ${lastClicked || isSelected ? "last-clicked" : ""}`}
    >
      {currentPiece && getPiece(currentPiece)}
      {labels}
      {!currentPiece && <label className={labelClass}>{"?"}</label>}
    </div>
  );
};

export default HiddenSquare;
