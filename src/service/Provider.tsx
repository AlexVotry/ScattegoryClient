import React, { useState } from 'react';
import socket from './socketConnection';

import WebSocketUtiltiy from './WebSocketUtility';
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

function Provider() {
  const [user, setUser] = useState({});
  const [userAnswers, setUserAnswers] = useState(new Map());

  const update = user => setUser(user);
  const updateUA = answers => setUserAnswers(answers);

  // socket.on('initUser', info => {
  //   user.update(info.currentUser);
  //   setMyTeam(user.team);
  //   setTeams(info.teams)
  // });
  
  socket.on('currentUser', newUser => {
      setUser(newUser);
  })


    return (
      <UserContext.Provider value={{ user, update }}>
        <AllUsersContext.AllUsersProvider>
          <TeamsContext.TeamsProvider >
            <CategoryContext.CategoryProvider>
              <LetterContext.LetterProvider>
                <GameStateContext.GameStateProvider>
                  <FinalAnswersContext.FinalAnswersProvider>
                    <OtherGuessesContext.OtherGuessesProvider>
                      <TeamScoreContext.TeamScoreProvider>
                        <TimerContext.TimerProvider>
                          <UserAnswersContext.Provider value={{ userAnswers, updateUA }}>
                            <WebSocketUtiltiy/>
                          </UserAnswersContext.Provider>
                        </TimerContext.TimerProvider>
                      </TeamScoreContext.TeamScoreProvider>
                    </OtherGuessesContext.OtherGuessesProvider>
                  </FinalAnswersContext.FinalAnswersProvider>
                </GameStateContext.GameStateProvider>
              </LetterContext.LetterProvider>
            </CategoryContext.CategoryProvider>
          </TeamsContext.TeamsProvider>
        </AllUsersContext.AllUsersProvider>
      </UserContext.Provider>
    )
}

export default Provider;