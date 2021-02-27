// create scategory list.

import React, { useContext, useMemo } from 'react';
import CategoryContext from '../contexts/CategoryContext';
import UserContext from '../contexts/UserContext';
import FinalAnswersContext from '../contexts/FinalAnswersContext';
import TeamScoreContext from '../contexts/TeamScoreContext';
import socket from '../service/socketConnection';
import {pad, stringify, newMap} from '../service/strings';
import {colors, styles} from '../cssObjects';
import { isEmpty, isEqual } from 'lodash';

const CategoryList = () => {
  const [list, setList] =CategoryContext.useCategory();
  const [finalAnswers, setFinalAnswers] = FinalAnswersContext.useFinalAnswers();
  const {user} = useContext(UserContext);
  const [teamScores, setTeamScores] = TeamScoreContext.useTeamScore();
  let teamAnswers = Object.keys(finalAnswers);
  const columns = Math.floor(12 / (teamAnswers.length + 1));
  const col = `col s${columns}`;
  const teamTotals = {};

  const makeHeaders = () => {
    return teamAnswers.map((team) => {
      teamAnswers[team] = 0; // reset teamAnswer to 0 everytime we refresh.
      return (
        <h5 className={col} key={team} style={{ color: colors[team] }}>{team}</h5>
      )
    })
  }

  const parseList = () => {
    return list.map((category, index) => {
      return (
        <div className="categroyListItems row hr" key={`${index}`}>
          <div className={col}>{category}</div>
          {showAnswers(index)}
        </div>
      )
    });
  }

  const showAnswers = (i) => {
    const index = pad(i);
    if (!teamAnswers.length) return;
    return teamAnswers.map((team) => {
      const newMap = finalAnswers[team].answers;
      let answer = newMap.has(index) ? newMap.get(index) : '';
      const styledAnswer = displayAnswer(answer, team);
      return (
        <div className={col} key={`${team}_${index}`} style={{color: colors[team]}}>
          <a style={{ color: colors[team] }} onClick={() => togglePoint(team, index, answer)}>{styledAnswer}</a>
        </div>
      );
    })
  }

  const togglePoint = (team, index, answer) => {
    let ans;
    if (answer.includes('!')) {
      ans = answer.replace('!', '');
      teamTotals[team] = teamTotals[team] + 1;
    } else {
      ans = `!${answer}`;
      teamTotals[team] = teamTotals[team] - 1;
    }
    finalAnswers[team].answers.set(index, ans);
    setTeamScores(teamTotals);
    serialize();
    socket.emit('failedAnswer', {answers: finalAnswers, group: user.group});
    deserialize()
  }

  const serialize = () => {
    teamAnswers.forEach(team => {
      const teamAnswers = finalAnswers[team].answers;
      finalAnswers[team].answers = stringify(teamAnswers); 
    })
  }

  const deserialize = () => {
    teamAnswers.forEach(team => {
      finalAnswers[team].answers = newMap(finalAnswers[team].answers);
    })
  }

  const displayAnswer = (answer, team) => {
    if (answer.startsWith('!')) {
      return <s style={{color: 'black'}}>{answer.substring(1)}</s>
    } else {
      if (answer.length) {
        if (teamTotals.hasOwnProperty(team)) {
          teamTotals[team] = teamTotals[team] + 1;
        } else {
          teamTotals[team] = 1;
        }
      }
      return <span style={{fontWeight: 'bold'}}>{answer}</span>;
    }
  }

  const showTeamTotals = () => {
    return teamAnswers.map((team) => {
      const currentScore = teamTotals[team] || 0;
      const total = finalAnswers[team].score + (currentScore);
      teamTotals[team] = total;
      if (!isEqual(teamTotals, teamScores)) {
        setTeamScores(teamTotals);
        socket.emit('updateScores', { score: teamTotals[user.team], team: user.team, group: user.group });
      }
      return (
        <div className={col} key={team} style={{ color: colors[team] }}>
          <div>Current: { currentScore }</div>
          <div>Total:{ total }</div>
        </div>
      )
    });
  }

  if (list.length) {
  return useMemo(() => {
    return (
      <div className="categoryList container" style={{ marginTop: '20px'}}>
        <div className="row hr">
          <h5 className={col}>Scategories</h5>
          {makeHeaders()}
        </div>
        {parseList()}
        <div className="row">
          <div className={col} style={{ fontWeight: 'bold' }}>Score</div>
          {showTeamTotals()}
        </div>
      </div>
    )
  }, [list, finalAnswers]) 
}
  return <div></div>

}

export default CategoryList;