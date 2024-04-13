import React, { useState } from 'react';
import GuessBox from './GuessBox';

const GuessTable = ({ hiddenSquares }) => {

    const renderBox = (squareName) => (
        <GuessBox squareName={squareName}
        />
      );
    return             <div className="box-container">


        {hiddenSquares.map(renderBox)}

    </div>
    
}


export default GuessTable;