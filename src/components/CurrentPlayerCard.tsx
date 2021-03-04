// shows the scategory list (GameSheet component), letter, timer, and control buttons for each team. 

import React, { useContext } from 'react';
import GameSheet from './GameSheet';
import UserContext from '../contexts/UserContext';
import { styles, colors, textColors } from '../cssObjects';

const CurrentPlayerCard = () => {
  const {user} = useContext(UserContext);
  const cardStyle = {
    backgroundColor: colors[user.team],
    color: textColors[user.team],
    marginRight: '10px',
    padding: '10px 10px 0 10px',
    height: '70vh',
    width: '35vw'
  }
  
  return (
    <div className="currentPlayerCard" style={styles.flexColumn}>
      <div className="gameCard" style={cardStyle} >
        <GameSheet />
      </div>
    </div>
  )
}

export default CurrentPlayerCard;