import React from 'react';
import { getContext, getProvider } from './helper';

const TeamsContext = React.createContext({});

function useTeams() {
  return getContext(TeamsContext, 'TeamsContext');
};

function TeamsProvider(props: any) {
  const [teams, setTeams] = React.useState({});
  return getProvider(TeamsContext, teams, setTeams, props);
}

export default { TeamsProvider, useTeams };