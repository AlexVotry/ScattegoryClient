import React from 'react';
import { getContext, getProvider } from './helper';

const OtherGuessesContext = React.createContext({});

function useOtherGuesses() {
  return getContext(OtherGuessesContext, 'OtherGuessesContext');
};

function OtherGuessesProvider(props: any) {
  const [otherGuesses, setOtherGuesses] = React.useState({});
  return getProvider(OtherGuessesContext, otherGuesses, setOtherGuesses, props);
}

export default { OtherGuessesProvider, useOtherGuesses };