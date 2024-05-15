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
  const [status, setStatus] = useState(initialStatus);
  // Update the currentPiece whenever selectedPiece changes
  useEffect(() => {
    setCurrentPiece(selectedPiece);
  }, [selectedPiece]);
  // This effect runs whenever initialStatus changes
  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  useEffect(() => {
    return () => {
      console.log("destructor SquareName " + squareName + " Status " + status);
    };
  }, []);
  // This effect runs on every render, mimicking an 'onLoad' behavior
  useEffect(() => {
    console.log(squareName + " rendered with status: " + status);
    // Any logic here will run on every update/render
  });

  const handleOnClick = () => {
    onClick();
    setCurrentPiece(lastClicked);
    console.log(status);
    setStatus("default"); // Set status to "default" when clicked
    initialStatus = "default";
    console.log(status);
  };

  return (
    <div
      onClick={handleOnClick}
      className={`box hidden ${isWhite ? "white" : "black"} ${status} ${lastClicked || isSelected ? "last-clicked" : ""}`}
    >
      {currentPiece && getPiece(currentPiece)}
      {labels}
      {!currentPiece && <label className={labelClass}>{"?"}</label>}
    </div>
  );
};

export default HiddenSquare;
