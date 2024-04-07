import "./App.css";
import ChessBoard from "./components/Chessboard"

export default function App() {

    const row1 = ['br', '', '', '', 'br', '', '', ''];
    const row2 = ['bp', '', '', '', '', '', 'bb', 'bk'];
    const row3 = ['', '', 'bp', '', '', '', 'bp', ''];
    const row4 = ['', '', 'bp', 'bp', '', 'wp', 'wp', 'bn'];
    const row5 = ['', '', '', '', '', '', '', 'wp'];
    const row6 = ['', '', '', '', '', '', 'wq', ''];
    const row7 = ['wp', 'bq', '', 'wn', '', '', '', ''];
    const row8 = ['', '', 'wk', 'wr', '', '', '', 'wr'];
  
    const board = [row1, row2, row3, row4, row5, row6, row7, row8];
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
  
      const shouldSelectKing = () => Math.random() < 0.8;
      const shouldSelectAdjacent = () => Math.random() < 0.8;
      const shouldSelectNull = () => Math.random() < 0.1;
  
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
  
  const hiddenSquares = generateHiddenSquares(board);
    // const hiddenSquares = [];

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
