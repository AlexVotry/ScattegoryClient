// displays the list of teams and the players on each team.

import React, { useContext, useMemo } from 'react';
import TeamsContext from '../contexts/TeamsContext';
import TeamScoreContext from '../contexts/TeamScoreContext';
import { colors, styles } from '../cssObjects';
import { orderTeams } from '../service/parseTeams';
import { isEmpty } from 'lodash';

function TeamList(): JSX.Element {
  const [list, setList] =TeamsContext.useTeams();
  const [teamScores, setTeamScores] = TeamScoreContext.useTeamScore();
  let sortedTeams = Object.keys(list);

  const playerStyle = {
    ...styles.flexPlayers,
    marginLeft: '30px'
  }

  const renderTeams = () => {
    sortedTeams = orderTeams(teamScores) || sortedTeams;
    return sortedTeams.map(team => {
      const score = isEmpty(teamScores) ? 0 : teamScores[team];
      const members = list[team];
      if (members.length) {
        return (
          <div key={team} >
            <h4 style={{color: colors[team]}}>{team}<span style={{fontSize: 'small'}}> score: {score} </span></h4>
            <ol style={playerStyle}>
              {parseTeamMembers(members)}
            </ol>
          </div>
        )
      }
    })
  }

  const parseTeamMembers = (members) => {
    return members.map(member => {
      return (
        <li key={member.name} style={{marginRight: '30px'}}>{member.name}</li>
      )
    })
  }
  
  
  if (isEmpty(list)) return <div></div>;
  
    return (
      <div style={{ backgroundColor: '#fff3e0', margin: '10px', padding: '10px' }}>
        {renderTeams()}
      </div>
    )

};

export default TeamList;