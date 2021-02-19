import React, { useReducer, useEffect } from "react";
// import { getContext, getProvider } from './helper';
import {UpdateContext} from '../types';

export default React.createContext<UpdateContext | undefined>(undefined);

// const localState = JSON.parse(localStorage.getItem("userInfo"));

// // function UserInfo() {
// //   getContext(UserContext, 'UserContext');
// // }

// let reducer = (user, newUser) => {
//   if (!newUser) {
//     localStorage.removeItem('userInfo');
//     return initialState;
//   };
//   return { ...user, ...newUser };
// }

// const initialState = {
//   name: ''
// };

// // replaces "UserContext.Provider value='something'" also puts user into local storage so we don't loose it on refresh.
// function UserProvider (props: any) {
//   const [user, setUser] = useReducer(reducer, localState || initialState);

//   useEffect(() => {
//     localStorage.setItem('userInfo', JSON.stringify(user));
//   }, [user]);

//   return getProvider(UserContext, user, setUser, props);
// };

// export default { UserProvider, UserContext };

