// Chessboard.js
import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import Modal from 'react-modal';

const ChessboardComponent = () => {
    const [chess] = useState(new Chess());
    const [hiddenSquares, setHiddenSquares] = useState(['h4']); // Manually input hidden squares
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    // Set up a custom puzzle position
    chess.load('8/8/7k/8/7r/6n1/6RP/6RK w - - 0 1');

    // Modify the board to remove pieces from hidden squares
    hiddenSquares.forEach(square => {
        const piece = chess.get(square);
        if (piece) {
            chess.remove(square);
        }
    });

    const handleSquareClick = (square) => {
        if (hiddenSquares.includes(square)) {
            setSelectedSquare(square);
            setModalOpen(true);
        }
    };

    const handlePieceSelect = (piece) => {
        chess.put({ type: piece.type, color: piece.color }, selectedSquare);
        setModalOpen(false);
    };

    const availablePieces = [
        { type: 'q', color: 'w' },
        { type: 'r', color: 'w' },
        { type: 'b', color: 'w' },
        { type: 'n', color: 'w' },
        { type: 'p', color: 'w' },
        { type: 'q', color: 'b' },
        { type: 'r', color: 'b' },
        { type: 'b', color: 'b' },
        { type: 'n', color: 'b' },
        { type: 'p', color: 'b' },
    ];

    return (
        <div>
            <Chessboard
                position={chess.fen()}
                draggable={false} // Disable dragging
                squareStyles={{
                    ...(hiddenSquares.reduce((acc, square) => {
                        acc[square] = { backgroundColor: 'blue' };
                        return acc;
                    }, {})),
                }}
                onSquareClick={handleSquareClick}
            />

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
                            <img
                                src={`https://chessboardjsx.com/img/chesspieces/wikipedia/${piece.color}${piece.type}.png`}
                                alt={`${piece.color}${piece.type}`}
                                style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                            />
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default ChessboardComponent;
