import {find, isEmpty} from 'lodash';

export const assignTeam = (teams, user) => {
 for (const [team, users] of Object.entries(teams)) {
   const currentUser = find(users, { 'name': user.name }) 
   if (currentUser) return team; 
 }
 return null;
}

export const findOthers = (team, user) => {
  // const currentUser = find(team, {'name': user.name });
  return team.filter(others => others.name !== user.name);
}

export const orderTeams = (teamScores) => {
  if (isEmpty(teamScores)) return null;

  const sortedTeams = [];
  const sorted = [];
  
  for (let team in teamScores) {
    sorted.push([team, teamScores[team]])
  };
  sorted.sort((a, b) => a[1] - b[1]).reverse();

  sorted.forEach(team => {
    sortedTeams.push(team[0]);
  });

  return sortedTeams;
}

export const getLeader = teamScores => {
  const sorted = [];

  for (let team in teamScores) {
    sorted.push([team, teamScores[team]])
  };
  sorted.sort((a, b) => a[1] - b[1]).reverse();

  return sorted;
}
