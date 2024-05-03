import "./App.css";
import ChessBoard from "./components/Chessboard"
import { getGame } from "./utils/BoardUtils";



export default function App() {

let game=getGame();
let board = game.board;
let hiddenSquares=game.hiddenSquares; 
return (<ChessBoard chessBoard={board} hiddenSquares={hiddenSquares}></ChessBoard>);
}
