// shows the scategory list for each team.

import React, { useContext, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import CategoryContext from '../contexts/CategoryContext';
import UserAnswersContext from '../contexts/UserAnswersContext';
import OtherGuessesContext from '../contexts/OtherGuessesContext';
import UserContext from '../contexts/UserContext';
import {pad} from '../service/strings';
import {colors} from '../cssObjects';

const OthersGameSheet = (props) => {
  const userAnswers = useContext(UserAnswersContext);
  const [otherGuesses, setOtherGuesses] = OtherGuessesContext.useOtherGuesses();
  const {user} = useContext(UserContext);
  const [list, setList] = CategoryContext.useCategpry();
  const [guesses, setGuesses] = useState(new Map());
  const [isChecked, setIsChecked] = useState({})
 
  const answerStyle = {
    backgroundColor: colors.White,
    color: colors.Red,
    width: "100%"
  }
  
  const handleChange = (e) => {
    const userAnswer = e.target.value;
    const val = userAnswer.split('^'); // [01_name, answer]
    const arr = val[0].split('_'); // [01, name]
    const checked = {...isChecked, [val[0]]: e.target.checked};
    setIsChecked(() => (checked));
    if (e.target.checked) {
      updateUserAnswers(arr[0], val[1]);
    } 
  }

  const listForm = () => {
    return list.map((category, i) => {
      const index = `${pad(i)}_${props.name}`;
      const guess = guesses.has(index) ? guesses.get(index) : '';
      
      return (
        <li className="otherGameSheetListItem" key={i}>
          {displayGuess(guess, index)}
        </li>
      )
    })
  }
  
  const displayGuess = (guess, index) => {
    if (!guess) return;
    const highlight = isChecked[index] ? { color: 'white'} : { color: colors.BlueGray};
    console.log('ischecked:', isChecked[index])
    return (
      <>
        <input className="with-gap blueGrey" style={answerStyle} name={guess} value={`${index}^${guess}`} type="checkbox" id={index} onChange={e => handleChange(e)} />
        <label style={highlight} htmlFor={index}>{guess}</label>
      </>
    )
  }
  const updateUserAnswers = (index: number, value: string) => {
    // const index = pad(i);
    const temp = userAnswers.userAnswers;
    if (temp.has(index)) temp.delete(index);
    temp.set(index, value);
    userAnswers.updateUA(temp);
  }

  const updateOtherAnswers = (index: number, value: string) => {
    if (guesses.has(index)) guesses.delete(index);
    setGuesses(new Map(guesses.set(index, value)));
  }
  
  useEffect(() => {
    updateUserAnswers(42, 'null');
      if (!isEmpty(otherGuesses)) {
        const { answers, name } = otherGuesses;
        const index = answers[0];
        const value = answers[1];
        if (name === props.name) {
          updateOtherAnswers(index, value);
        } else if (name === user.name) {
          updateUserAnswers(index, value);
        }
      }
  }, [otherGuesses, userAnswers])

  return (
    <ol className="gameSheet">
      {listForm()}
    </ol>
  )
};

export default OthersGameSheet;
