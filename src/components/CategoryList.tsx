// create scategory list.

import React, { useContext, useRef, useEffect, useMemo } from 'react';
import CategoryContext from '../contexts/CategoryContext';
import UserContext from '../contexts/UserContext';
import FinalAnswersContext from '../contexts/FinalAnswersContext';
import TeamScoreContext from '../contexts/TeamScoreContext';
import socket from '../service/socketConnection';
import { resetAnswersAndScores } from '../service/reset';
import {pad, stringify, newMap} from '../service/strings';
import {colors, styles} from '../cssObjects';
import { isEmpty, isEqual } from 'lodash';

const CategoryList = () => {
  // const list = categoryList;  //mock data
  // const finalAnswers = teamAnswer; //mock data
  const [list, setList] =CategoryContext.useCategpry();
  const [finalAnswers, setFinalAnswers] = FinalAnswersContext.useFinalAnswers();
  const {user} = useContext(UserContext);
  const [teamScores, setTeamScores] = TeamScoreContext.useTeamScore();
  // const [score, setTeamScores] = useState({});
  let teamAnswers = Object.keys(finalAnswers);
  const columns = Math.floor(12 / (teamAnswers.length + 1));
  const col = `col s${columns}`;
  const teamTotals = {};

  const makeHeaders = () => {
    console.log('categoryList')
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
          <a style={{ color: colors[team] }} onClick={() => removePoint(team, index, answer)}>{styledAnswer}</a>
        </div>
      );
    })
  }

  const removePoint = (team, index, answer) => {
    const ans = `!${answer}`;
    finalAnswers[team].answers.set(index, ans);
    teamTotals[team] = teamTotals[team] - 1;
    setTeamScores(teamTotals);
    serialize();
    socket.emit('failedAnswer', finalAnswers);
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
    // console.log('teamTotals:', teamTotals, 'teamScores:', teamScores)
    return teamAnswers.map((team) => {
      const currentScore = teamTotals[team] || 0;
      const total = finalAnswers[team].score + (currentScore);
      teamTotals[team] = total;
      if (!isEqual(teamTotals, teamScores)) {
        setTeamScores(teamTotals);
        socket.emit('updateScores', { score: teamTotals[user.team], team: user.team });
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