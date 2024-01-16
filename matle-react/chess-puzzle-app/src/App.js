import React from 'react';
import ChessboardComponent from './Chessboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Remove the default React logo */}
        <h1>Chess Puzzle App</h1>
        <ChessboardComponent />
      </header>
    </div>
  );
}

export default App;
