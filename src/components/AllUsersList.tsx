import React from 'react';

import AllUsersContext from '../contexts/AllUsersContext';

const AllUsersList = () => {
  const [allUsers, setAllUsers] = AllUsersContext.useAllUsers();

  const listOfUsers = () => {
    return allUsers.map(player => {
      return (
        <li className="collection-item" key={player}>
            {player}
        </li>
      )
    })
  }

  return (
    <div className="row">
      <h5>You have joined! Once everyone has joined, the Admin will create the teams.</h5>
      <div className="col s12 l6">
        <div className="card blue-grey darken-1">
          <div className="card-content blue-grey-text">
            <span className="card-title" style={{color: 'white'}}>List of Joined players:</span>
              <ul className="collection">
                {listOfUsers()}
              </ul>
          </div>
        </div>
      </div>
    </div>
  )

}

export default AllUsersList;