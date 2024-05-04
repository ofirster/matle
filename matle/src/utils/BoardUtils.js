import boards from '../boards.json';  // Assuming the JSON file is in the src folder

export function stringToBoard(boardString) {
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

function getNearestCells(cellRow,cellCol,radius)
{
    function isCellValid(cell)
    {
        return (cell[0]>0 && cell[0] < 8 && cell[1]>0 && cell[1] < 8)
    }
    const res=[]
    let cell = [cellRow-radius,cellCol-radius];
    // top row
        for (let i = 1; i <= radius*2+1; i++) {                
            if(isCellValid(cell))
                res.push(cell);
            cell=[cellRow-radius, cellCol-radius+i]                
        }
        cell = [cellRow+radius,cellCol-radius];
        for (let i = 1; i <= radius*2+1; i++) {                
            if(isCellValid(cell))
                res.push(cell);
            cell=[cellRow+radius, cellCol-radius+i]               
        }
        for(let i =1; i< radius*2;i++){
            let cell = [cellRow-radius+i,cellCol-radius];
            if(isCellValid(cell))
                res.push(cell);
             cell = [cellRow-radius+i,cellCol+radius];
                if(isCellValid(cell))
                    res.push(cell);
        }
        
        return res;
    }

export function getGame()
{
    const boardStr = boards[Math.floor(Math.random() * boards.length)];
    const board = stringToBoard(boardStr)    
    let blackKingCell=null;
    let whiteKingCell=null;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece=board[row][col];
            if(piece==='wk')
                whiteKingCell=[row,col]
            else if(piece==='bk')
                blackKingCell=[row,col]
        }            
    } 

    let hiddenSquares=[]
    let cellsToHide=[blackKingCell,whiteKingCell]
    for (let radius = 1; radius <= 2; radius++) {        
        let nearWhiteKing=getNearestCells(whiteKingCell[0],whiteKingCell[1],radius);
        cellsToHide.push(...nearWhiteKing)        
    }    
    for (let radius = 1; radius <= 2; radius++) {        
        let nearBlackKing=getNearestCells(blackKingCell[0],blackKingCell[1],radius);
        cellsToHide.push(...nearBlackKing)        
    }    
    cellsToHide=shuffleArray(cellsToHide);
    for (let i = 0; i < Math.min(5,cellsToHide.length); i++) {
        hiddenSquares.push(getSquareName(cellsToHide[i][0],cellsToHide[i][1]));
    }


    return {board:board, hiddenSquares:hiddenSquares}
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index lower than the current position
        let j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


export function getGame2()
{
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
              hiddenSquares.push(getSquareName(col, row));
          } else if (shouldSelectAdjacent() && isAdjacentToKing(row, col)) {
              hiddenSquares.push(getSquareName(col, row));
          } else if (shouldSelectNull() && board[row][col] === '') {
              hiddenSquares.push(getSquareName(col, row));
          }
      }
  
      return hiddenSquares;
  }
  
  let hiddenSquares = generateHiddenSquares(board);
  return {board:board, hiddenSquares:hiddenSquares}
}

function getSquareName(row, col) {
    return `${String.fromCharCode(97 + col)}${8 - row}`;
}
