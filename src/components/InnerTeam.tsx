// import React from 'react';
// import { styles } from '../cssObjects';

// const InnerTeamList = React.memo(({ list, teamScores }) => (
//   <div>
//     {renderTeams()}
//   </div>
// )


//   let sortedTeams = Object.keys(list);

//   const playerStyle = {
//     ...styles.flexPlayers,
//     marginLeft: '30px'
//   }

//   const renderTeams = () => {
//     sortedTeams = orderTeams(teamScores) || sortedTeams;
//     return sortedTeams.map(team => {
//       const score = isEmpty(teamScores) ? 0 : teamScores[team];
//       const members = list[team];
//       if (members.length) {
//         return (
//           <div key={team}>
//             <h4 style={{ color: colors[team] }}>{team}<span style={{ fontSize: 'small' }}> score: {score} </span></h4>
//             <ol style={playerStyle}>
//               {parseTeamMembers(members)}
//             </ol>
//           </div>
//         )
//       }
//     })
//   }
  
//   const parseTeamMembers = (members) => {
//     return members.map(member => {
//       return (
//         <li key={member.name} style={{ marginRight: '30px' }}>{member.name}</li>
//         )
//       })
//     }

//     return renderTeams();
// )

//   export default InnerTeamList;