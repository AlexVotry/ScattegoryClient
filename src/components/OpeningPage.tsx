// first page to be seen, 

import React, { useContext } from 'react';

import CategoryList from './CategoryList';
import ControlButtons from './ControlButtons';
import Settings from './Settings';
import JoinTeam from './JoinTeam';
import TeamList from './TeamList';
import AllUsersList from './AllUsersList';
import UserContext from '../contexts/UserContext';
import FinalAnswersContext from '../contexts/FinalAnswersContext';
import TeamScoreContext from '../contexts/TeamScoreContext';

import socket from '../service/socketConnection';
import { resetAnswersAndScores } from '../service/reset'
import {styles} from '../cssObjects';
import { isEmpty } from 'lodash';

const OpeningPage = () => {
  const [finalAnswers, setFinalAnswers] = FinalAnswersContext.useFinalAnswers();
  const { user } = useContext(UserContext);
  const [teamScores, setTeamScores] = TeamScoreContext.useTeamScore();
  let startOverAnswers = {};
  
  const openingStyle = {
    ...styles.flexRow,
    padding: '0 30px' 
  }

  const joinTeam = () => {
    if (!isEmpty(user) ) {
      if (user.team) return null;
      return <AllUsersList/>
    }
    return <JoinTeam/>
  }

  const displayName = () => {
    if (isEmpty(user)) return null;
    const name = user.name ? `Player: ${user.name}` : '';
    const team = user.team ? `Team: ${user.team}` : '';
      return (
        <>
        <h5>{name}</h5>
        <h5>{team}</h5>
        </>
      )
  }

  socket.on('AllSubmissions', finalSubmissions => {
    const teamArray = Object.keys(finalSubmissions);
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
    const teamArray = Object.keys(teamScores);
    teamArray.forEach(team => {
      startOverAnswers = { ...startOverAnswers, [team]: { answers: answerMap, score: 0 } }
    });
    setFinalAnswers(startOverAnswers);
  })
  
  return (
    <>
    <div className="adminBtns" style={styles.flexRow}>
      <ControlButtons/>
      <Settings />
    </div>
    <div className="OpeningPage" style={openingStyle}>
        <div className="openingPageLeft" style={{ width: '70vw' }}>
        <CategoryList/>
        {joinTeam()}
      </div>
      <div className="teamList" style={{ width: '25vw' }}>
        <TeamList/>
      </div>
    </div>
    </>
  );
};

export default OpeningPage;