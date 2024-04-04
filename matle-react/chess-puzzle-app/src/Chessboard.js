// ChessWordle.js
import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import Modal from 'react-modal';

import './ChessWordle.css'; // Import the CSS file with additional styles

const ChessWordle = () => {
    const [puzzleSquares, setPuzzleSquares] = useState(['h1', 'h2', 'h4', 'h6', 'g3']);
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [guesses, setGuesses] = useState({});
    const [submittedGuesses, setSubmittedGuesses] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [guessRows, setGuessRows] = useState([
        { squares: Array(5).fill(null), feedback: Array(5).fill(null) },
        { squares: Array(5).fill(null), feedback: Array(5).fill(null) },
        { squares: Array(5).fill(null), feedback: Array(5).fill(null) },
        { squares: Array(5).fill(null), feedback: Array(5).fill(null) },
        { squares: Array(5).fill(null), feedback: Array(5).fill(null) },
    ]);

    const _puzzleSquares = ['h1', 'h2', 'h4', 'h6', 'g3'];

    // Initialize the chessboard with puzzle squares
    useEffect(() => {
        setPuzzleSquares(_puzzleSquares);
    }, []);

    const handleSquareClick = (square) => {
        if (!submittedGuesses.includes(square) && currentRow < 5) {
            setSelectedSquare(square);
            setModalOpen(true);
        }
    };

    const handlePieceSelect = (piece) => {
        setGuesses({ ...guesses, [selectedSquare]: piece });
        setModalOpen(false);
    };

    const handleSubmitGuesses = () => {
        const feedbackForGuess = [];

        // Check each guess against the puzzle squares
        for (const square in guesses) {
            if (puzzleSquares.includes(square)) {
                if (guesses[square] === 'empty') {
                    feedbackForGuess.push({ square, color: 'green' });
                } else if (puzzleSquares.includes(square) && guesses[square] === puzzleSquares[puzzleSquares.indexOf(square)]) {
                    feedbackForGuess.push({ square, color: 'green' });
                } else if (puzzleSquares.includes(square) && puzzleSquares.includes(guesses[square])) {
                    feedbackForGuess.push({ square, color: 'yellow' });
                } else {
                    feedbackForGuess.push({ square, color: 'gray' });
                }
            }
        }

        // Set the feedback for the current row
        setGuessRows((prevGuessRows) =>
            prevGuessRows.map((row, index) => (index === currentRow ? { ...row, feedback: feedbackForGuess } : row))
        );

        setFeedback([...feedback, ...feedbackForGuess]);
        setSubmittedGuesses([...submittedGuesses, ...Object.keys(guesses)]);

        // Reset selectedSquare and guesses
        setSelectedSquare(null);
        setGuesses({});

        // Check if the player won
        if (feedbackForGuess.every((item) => item.color === 'green') && feedback.length === puzzleSquares.length) {
            alert('Congratulations! You won!');
            // Add logic for starting a new game or any other action
        } else {
            // Move to the next row
            setCurrentRow((prevRow) => (prevRow < 4 ? prevRow + 1 : prevRow));
        }
    };

    const availablePieces = ['empty', 'q', 'r', 'b', 'n', 'p', 'k', 'Q', 'R', 'B', 'N', 'P', 'K'];

    return (
        <div>
            <Chessboard
                draggable={false}
                position="8/8/7k/8/7r/6n1/6RP/6RK w - - 0 1"
                squareStyles={{
                    ...(puzzleSquares.reduce((acc, square) => {
                        acc[square] = { backgroundColor: 'blue', visibility: 'hidden', border: '2px dotted red' };
                        return acc;
                    }, {})),
                    ...(feedback.reduce((acc, item) => {
                        acc[item.square] = { backgroundColor: item.color };

                        // If the feedback is green or yellow, show the piece on the puzzle square
                        if (['green', 'yellow'].includes(item.color)) {
                            acc[item.square].visibility = 'visible';
                        }

                        return acc;
                    }, {})),
                }}
            />

            <table className="wordle-table">
                <tbody>
                    {guessRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.feedback.map((feedback, colIndex) => (
                                <td key={colIndex} className={feedback ? `feedback-${feedback.color}` : ''}></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxWidth: '300px',
                    },
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Select a piece</h2>
                <div className="pieces-container">
                    {availablePieces.map((piece, index) => (
                        <div key={index} className="piece" onClick={() => handlePieceSelect(piece)}>
                            {piece === 'empty' ? 'Empty' : (
                                <img
                                    src={`https://chessboardjsx.com/img/chesspieces/wikipedia/${piece}.png`}
                                    alt={piece}
                                    style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={handleSubmitGuesses}>Submit Guesses</button>
            </Modal>
        </div>
    );
};

export default ChessWordle;
