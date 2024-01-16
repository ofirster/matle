// Chessboard.js
import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const ChessboardComponent = () => {
    const [chess] = useState(new Chess());
    const hiddenSquares = ['h4']; // Manually input hidden squares

    // Set up a custom puzzle position
    chess.load('8/8/7k/8/7r/6n1/6RP/6RK w - - 0 1');

    // Modify the board to remove pieces from hidden squares
    hiddenSquares.forEach(square => {
        const piece = chess.get(square);
        if (piece) {
            chess.remove(square);
        }
    });

    // Customize the dark square style for hidden squares
    const customHiddenSquareStyle = {
        backgroundColor: 'blue',
    };

    return (
        <Chessboard
            position={chess.fen()}
            draggable={false} // Disable dragging
            squareStyles={{
                ...(hiddenSquares.reduce((acc, square) => {
                    acc[square] = customHiddenSquareStyle;
                    return acc;
                }, {})),
            }}
        />
    );
};

export default ChessboardComponent;
