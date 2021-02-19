import React from 'react';
import { getContext, getProvider } from './helper';

const TeamScoreContext = React.createContext({});

function useTeamScore() {
  return getContext(TeamScoreContext, 'TeamScoreContext');
};

function TeamScoreProvider(props: any) {
  const [teamScores, setTeamScores] = React.useState({});
  return getProvider(TeamScoreContext, teamScores, setTeamScores, props);
}

export default { TeamScoreProvider, useTeamScore };