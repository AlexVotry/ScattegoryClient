import React, { useState, useContext, useEffect } from 'react';
import socket from './socketConnection';
import { isEqual, isEmpty } from 'lodash';
import { assignTeam } from '../service/parseTeams';
import { resetAnswersAndScores } from '../service/reset';

import App from '../components/App/App';
import UserContext from '../contexts/UserContext';
import AllUsersContext from '../contexts/AllUsersContext';
import TeamsContext from '../contexts/TeamsContext';
import LetterContext from '../contexts/LetterContext';
import CategoryContext from '../contexts/CategoryContext';
import GameStateContext from '../contexts/GameStateContext';
import UserAnswersContext from '../contexts/UserAnswersContext';
import OtherGuessesContext from '../contexts/OtherGuessesContext';
import FinalAnswersContext from '../contexts/FinalAnswersContext';
import TeamScoreContext from '../contexts/TeamScoreContext';
import TimerContext from '../contexts/TimerContext';

function WebSocketUtility() { 
  const [teams, setTeams] = TeamsContext.useTeams();
  const [myTeam, setMyTeam] = useState('');

  const user = useContext(UserContext);
  const userInfo = user.user;
  const [userPrev, setUserPrev] = useState(userInfo);
  const [allUsers, setAllUsers] = AllUsersContext.useAllUsers();

  const [finalAnswers, setFinalAnswers] = FinalAnswersContext.useFinalAnswers();
  const [otherGuesses, setOtherGuesses] = OtherGuessesContext.useOtherGuesses();

  const [gameState, setGameState] =GameStateContext.useGameState();
  const [prevGameState, setprevGameState] = useState('');
  const [currentLetter, setCurrentLetter] = LetterContext.useLetter();
  const [categories, setCategories] = CategoryContext.useCategpry();
  const [timer, setTimer] = TimerContext.useTimer();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isEqual(userInfo, userPrev)) initiate();
  }, [userInfo])
  
  function initiate() {
    setUserPrev(userInfo);
    socket.on('newGame', gameInfo => {
      setCategories(gameInfo.categories);
      setCurrentLetter(gameInfo.currentLetter);
    });

    socket.on('AllUsers', allUsers => {
      setAllUsers(allUsers)
    })

    socket.on('newTeams', newTeams => {
        setTeams(newTeams);
        const localState = userInfo;
        const team = !isEmpty(localState) ? assignTeam(newTeams, localState) : null;
        const newUser = { ...localState, team };
        user.update(newUser);
        setMyTeam(team);
        localStorage.removeItem('userInfo');
        localStorage.setItem('userInfo', JSON.stringify(newUser));
        socket.emit('myTeam', team);
      })

    socket.on('gameState', gameState => {
      console.log('gamestate:', gameState)
      if (prevGameState !== gameState) {
        setGameState(gameState);
      }
    });

    socket.on('updateMessage', newMessages => {
      setMessages(arr => [...arr, newMessages]);
    });

    socket.on('Clock', clock => setTimer(clock));

    socket.on('AllSubmissions', finalSubmissions => {
      const teamArray = Object.keys(finalSubmissions);
      setGameState('ready');
      setOtherGuesses({});
      teamArray.forEach(team => {
        const teamAnswers = finalSubmissions[team].answers;

        if (typeof teamAnswers === 'string') {
          finalSubmissions[team].answers = new Map(JSON.parse(finalSubmissions[team].answers));
        }
      })
      setFinalAnswers(finalSubmissions);
    });

    socket.on('startOver', numOfCategories => {
      const answerMap = resetAnswersAndScores(numOfCategories);
      const teamArray = Object.keys(teams);
      let finalSubs = {};
      teamArray.forEach(team => {
        finalSubs = { ...finalSubs, [team]: { answers: answerMap, score: 0 } }
      });
      setFinalAnswers(finalSubs);
      setGameState('ready');
    });

    socket.on('updateAnswers', newGuesses => {
      setOtherGuesses(newGuesses);
    })
  }

  return (
    <div>
    <App myTeam={myTeam}/>
    </div>
  )
}

export default WebSocketUtility;