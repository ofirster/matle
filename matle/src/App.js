import "./App.css";
import ChessBoard from "./components/Chessboard"
import boards from './boards.json';  // Assuming the JSON file is in the src folder




export default function App() {


    function stringToBoard(boardString) {
        // Split the string into lines (rows of the chessboard)
        const rows = boardString.split('\n');
    
        // Initialize an empty board array
        const board = [];
    
        // Map from single-letter codes to your internal representation
        const pieceMap = {
            'r': 'br', 'n': 'bn', 'b': 'bb', 'q': 'bq', 'k': 'bk', 'p': 'bp',
            'R': 'wr', 'N': 'wn', 'B': 'wb', 'Q': 'wq', 'K': 'wk', 'P': 'wp',
            '.': ''
        };
    
        // Iterate over each row in the rows array
        rows.forEach(row => {
            const pieces = row.trim().split(/\s+/); // Split the row by spaces to get pieces
            const boardRow = pieces.map(piece => pieceMap[piece] || ''); // Map each piece to its full form
            board.push(boardRow); // Add the mapped row to the board
        });
    
        return board;
    }


   
    // const board = [row1, row2, row3, row4, row5, row6, row7, row8];
    const boardStr = boards[Math.floor(Math.random() * boards.length)];
    const board = stringToBoard(boardStr)
    function generateHiddenSquares(board) {
      const hiddenSquares = [];
      
      const numRows = board.length;
      const numCols = board[0].length;
  
      const randomIndex = (max) => Math.floor(Math.random() * max);
  
      const isAdjacentToKing = (row, col) => {
          for (let i = row - 1; i <= row + 1; i++) {
              for (let j = col - 1; j <= col + 1; j++) {
                  if (i >= 0 && i < numRows && j >= 0 && j < numCols && board[i][j] === 'wk') {
                      return true;
                  }
              }
          }
          return false;
      };
  
      const shouldSelectKing = () => Math.random() < 0.95;
      const shouldSelectAdjacent = () => Math.random() < 0.8;
      const shouldSelectNull = () => Math.random() < 0.05;
  
      while (hiddenSquares.length < 5) {
          const row = randomIndex(numRows);
          const col = randomIndex(numCols);
          
          if (shouldSelectKing() && (board[row][col] === 'wk' || board[row][col] === 'bk')) {
              hiddenSquares.push(`${String.fromCharCode(97 + col)}${numRows - row}`);
          } else if (shouldSelectAdjacent() && isAdjacentToKing(row, col)) {
              hiddenSquares.push(`${String.fromCharCode(97 + col)}${numRows - row}`);
          } else if (shouldSelectNull() && board[row][col] === '') {
              hiddenSquares.push(`${String.fromCharCode(97 + col)}${numRows - row}`);
          }
      }
  
      return hiddenSquares;
  }
  
  let hiddenSquares = generateHiddenSquares(board);

    function handleGuess()
    {
      console.log("guess")
    }
return (
<div className="chessboard-container">
    <ChessBoard chessBoard={board} hiddenSquares={hiddenSquares}></ChessBoard>
    </div>
   
      
);
}
