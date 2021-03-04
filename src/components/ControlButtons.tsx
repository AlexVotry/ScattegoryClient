//group of buttons.

import React, {useContext} from 'react';
import { isEmpty } from 'lodash';
import UserContext from '../contexts/UserContext';
import TeamsContext from '../contexts/TeamsContext';
import GameStateContext from '../contexts/GameStateContext';
import socket from '../service/socketConnection';
import { styles } from '../cssObjects';

const ControlButtons = () => {
  const gameState = GameStateContext.useGameState();
  const [teams, setTeams] = TeamsContext.useTeams();
  const {user} = useContext(UserContext);
  const {group} = user;
  let teamBtn = {display: 'inline-block'};
  let otherBtns = {display: 'none'};

  if (!isEmpty(teams)) {
    teamBtn = {display: 'none'};
    otherBtns = {display: 'inline-block'};
  }

  const runningBtns = {
    ...styles.btnRunning,
    otherBtns
  }
  const btnStyle = gameState === 'running' ? runningBtns : otherBtns;

  const start = () => {
    socket.emit('changeGameState', { state: 'running', group });
  }
  const pause = () => {
    socket.emit('pushPause', group);
  }
  const reset = () => {
    socket.emit('reset', group);
  }
  const startOver = () => {
    socket.emit('changeGameState', { state: 'startOver', group });
  }

  const createTeams = () => {
    socket.emit('createTeams', group);
  }
  if (!user.admin) return <div className="noAdmin"></div>;
  return (
    <div className="btnGroup">
      <a className="waves-effect waves-red btn" onClick={start} style={btnStyle}>Start</a>
      <a className="waves-effect waves-red btn" onClick={pause} style={btnStyle}>Pause</a>
      <a className="waves-effect waves-red btn" onClick={reset} style={btnStyle}>Reset Round</a>
      <a className="waves-effect waves-red btn" onClick={startOver} style={btnStyle}>Reset Game</a>
      <a className="waves-effect waves-red btn" onClick={createTeams} style={teamBtn} >Create Teams</a>
    </div>
  )
}

export default ControlButtons;