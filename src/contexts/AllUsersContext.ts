import React from 'react';
import { getContext, getProvider } from './helper';

const AllUsersContext = React.createContext({});

function useAllUsers() {
  return getContext(AllUsersContext, 'AllUsersContext');
};

function AllUsersProvider(props: any) {
  const [allUsers, setAllUsers] = React.useState([]);
  return getProvider(AllUsersContext, allUsers, setAllUsers, props);
}

export default { AllUsersProvider, useAllUsers };
