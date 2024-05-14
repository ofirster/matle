import React, { useState, useEffect } from "react";
import getPiece from "../utils/PieceGenerator";

const HiddenSquare = ({
  squareName,
  isWhite,
  onClick,
  onPieceDrop,
  initialStatus, // Rename prop to initialStatus to avoid direct mutation and confusion
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
  const [status, setStatus] = useState(initialStatus); // Manage status as state

  // Update the currentPiece whenever selectedPiece changes
  useEffect(() => {
    setCurrentPiece(selectedPiece);
  }, [selectedPiece]);

  // At the top of HiddenSquare component
  useEffect(() => {
    console.log("initialStatus received:", initialStatus);
    setStatus(initialStatus);
  }, [initialStatus]); // This ensures any changes in initialStatus prop are caught

  useEffect(() => {
    console.log("Status set to:", status);
  }, [status]); // This logs whenever status changes

  const handleOnClick = () => {
    onClick();
    setCurrentPiece(lastClicked);
    setStatus(null); // Update status via setState
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
