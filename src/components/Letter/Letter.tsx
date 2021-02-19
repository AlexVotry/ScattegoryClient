// displays the letter we use to choose the words for scategory list

import React, {useState, useContext} from 'react';
import LetterContext from '../../contexts/LetterContext';
import './letter.css';

const Letter = (): JSX.Element => {
  const [currentLetter, setCurrentLetter] = LetterContext.useLetter();

  return (
      <div id="letterContainer">
          <div className="letter"><a href="#">{currentLetter}</a></div>
      </div>
  );
};

export default Letter;