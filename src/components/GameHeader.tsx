import React, {useContext} from 'react';

import Letter from './Letter/Letter';
import Timer from './Timer';
import { styles } from '../cssObjects';
import LeaderBoard from './LeaderBoard';

function GameHeader(): JSX.Element {

  return (
    <>
      <div id="gameHeader" style={styles.flexHeader}>
        <LeaderBoard/>
        <Letter />
        <Timer />
      </div>
    </>
  )
}

export default GameHeader;