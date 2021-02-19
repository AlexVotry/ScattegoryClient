// shows the scategory list for each team.

import React, { useState, useContext, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import CategoryContext from '../contexts/CategoryContext';
import UserContext from '../contexts/UserContext';
import TeamsContext from '../contexts/TeamsContext';
import UserAnswersContext from '../contexts/UserAnswersContext';
import { colors, styles } from '../cssObjects';
import socket from '../service/socketConnection';
import { pad } from '../service/strings';
import { updateUserAnswers } from '../service/updateAnswers';
import { findOthers } from '../service/parseTeams';

const GameSheet = () => {
  const {user} = useContext(UserContext);
  const userAnswers = useContext (UserAnswersContext);
  const [list, setList] = CategoryContext.useCategpry();
  const [teams, setTeams] = TeamsContext.useTeams();
  const { name, team } = user;
  const [answers, setAnswers] = useState(new Map());
  const [message, setMessage] = useState('');
  const [active, setActive] = useState('');
  const others = findOthers(teams[user.team], user);

  const bgColor = user.team === "Gold" ? 'grey' : 'white';
  const textColor = user.team === 'Green' ? 'teamGreen' : '';

  const messageBackground = {
    color: colors[user.team],
    backgroundColor: bgColor,
    padding: 0,
    cursor: 'help',
    display: 'inline-block',
    height: '25px'
  }

  const catList = {
    ...styles.flexRow,
    alignItems: 'center'
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const updateAnswer = (index, val) => {
    if (answers.has(index)) answers.delete(index);
    setAnswers(new Map(answers.set(index, val)));
    const i = `${pad(index)}_${name}`;
    if (!others.length) {
      updateUserAnswers(i, val);
    } else {
      const guesses = { answers: [i, val], name };
      socket.emit('newGuess', {guesses, team});
    }
  }

  const updateMessage = e => {
    e.preventDefault();
    socket.emit('newMessage', {message, name, team});
    setMessage('');
  }

  const updateUserAnswers = (index: string, value: string) => {
    const temp = userAnswers.userAnswers;
    if (temp.has(index)) temp.delete(index);
    temp.set(index, value);
    userAnswers.updateUA(temp);
  }

  const listForm = () => {
    return list.map((category, index) => {
      const ol = index + 1;
      return (
        <li className="gameSheetListItem" style={catList} key={category} >
          <div className="category" style={{width: '50%'}}>{ol}.  {category}</div>
          <div className="input-field inline" style={{ width: '40%', margin: '0', display:'inline-block', height:'30px'}}>
            <input
              style={messageBackground}
              id={`cat_${index}`}
              type="text"
              value={answers[index]}
              onChange={e => updateAnswer(index, e.target.value)}
            />
          </div>
        </li>
      )
    })
  }

  const checkPlaceholder = () => {
    if (!message) setActive('');
  }

  return (
    <div className="gameSheet" style={{padding: '0 10px'}}>
      <form className="messageForm" onSubmit={updateMessage}>
        <div className={`input-field ${textColor}`}>
          <i className="material-icons prefix">chat</i>
          <input
            style ={messageBackground}
            id='messageText'
            type="text"
            value={message}
            onFocus={() => setActive('active')}
            onBlur={checkPlaceholder}
            onChange={e => setMessage(e.target.value)}
            />
          <label className={active} htmlFor='messageText'style={styles.messageLabel}>Send a message - press Enter</label>
        </div>
      </form>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <Scrollbars style={{height: '50vh'}}>
            <ol>
              {listForm()}
            </ol>
          </Scrollbars>
        </div>
      </form>
    </div>
  )
};

export default GameSheet;
