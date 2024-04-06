import "./App.css";
import ChessBoard from "./components/Chessboard"

export default function App() {

    const row1 = ['br', null, null, null, 'br', null, null, null];
    const row2 = ['bp', null, null, null, null, null, 'bb', 'bk'];
    const row3 = [null, null, 'bp', null, null, null, 'bp', null];
    const row4 = [null, null, 'bp', 'bp', null, 'wp', 'wp', 'bn'];
    const row5 = [null, null, null, null, null, null, null, 'wp'];
    const row6 = [null, null, null, null, null, null, 'wq', null];
    const row7 = ['wp', 'bq', null, 'wn', null, null, null, null];
    const row8 = [null, null, 'wk', 'wr', null, null, null, 'wr'];
  
    const board = [row1, row2, row3, row4, row5, row6, row7, row8];
    const hiddenSquares = ['c1', 'b2', 'e1', 'd1', 'b7'];
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
