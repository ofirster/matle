import React, { useState,  useEffect } from 'react';
import Square from './Square';

const Chessboard = () => {

  const row1 = [null,null,null,null,null,null,null,null];
  const row2 = [null,null,null,null,null,null,null,null];
  const row3 = [null,null,null,'bk',null,null,null,null];
  const row4 = [null,null,null,'br','wq',null,null,null];
  const row5 = [null,null,null,null,null,null,null,null];
  const row6 = [null,null,null,null,null,null,null,null];
  const row7 = [null,null,null,null,null,null,null,null];
  const row8 = [null,null,null,null,null,null,null,null];

  const chessBoard = [row1,row2,row3,row4,row5,row6,row7,row8]
  


  return (
    <>
        {chessBoard.length > 0 &&
            chessBoard.map((row, rIndex) => {
                return (
                    <div className="row" key={rIndex}>
                        {row.map((piece, cIndex) => {
                            return (
                        <Square key={`${cIndex}`} isWhite={(rIndex+cIndex)%2===0} piece={piece} />

                            );
                        })}
                    </div>
                );
            })}
    </>
  );
  }

  //   return (
  //     <div style={{ width: '400px', height: '400px', display: 'flex', flexWrap: 'wrap' }}>
  //       {board.map((row,ri) => {
  //         row.map((piece,ci) => (
  //           <Square key={`${ci}`} isWhite={(ri+ci)%2===0} piece={piece} />
  //         ))
  //       }
  //       )}
  //     </div>
  //   );
// };

export default Chessboard;
