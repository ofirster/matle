import React, { useState,  useEffect } from 'react';
import Square from './Square';

const Chessboard = () => {

  const row1 = ['br',null,null,null,'br',null,null,null];
  const row2 = ['bp',null,null,null,null,null,'bb','bk'];
  const row3 = [null,null,'bp',null,null,null,'bp',null];
  const row4 = [null,null,'bp','bp',null,'wp','wp','bknight'];
  const row5 = [null,null,null,null,null,null,null,'wp'];
  const row6 = [null,null,null,null,null,null,'wq',null];
  const row7 = ['wp','bq',null,'wknight',null,null,null,null];
  const row8 = [null,null,'wk','wr',null,null,null,'wr'];

  const chessBoard = [row1,row2,row3,row4,row5,row6,row7,row8]
  
  const hiddenSquares=['e3','e4','e1','a4','h8']


  return (
    <>
        {chessBoard.length > 0 &&
            chessBoard.map((row, rIndex) => {
                return (
                    <div className="row" key={rIndex}>
                        {row.map((piece, cIndex) => {
                          var squareName = String.fromCharCode(97 + cIndex)+(rIndex+1);
                          const isHidden=hiddenSquares.includes(squareName);
                            return (
                        <Square key={`${cIndex}`} isHidden={isHidden} isWhite={(rIndex+cIndex)%2===0} piece={piece} />

                            );
                        })}
                    </div>
                );
            })}
    </>
  );
  }


export default Chessboard;
