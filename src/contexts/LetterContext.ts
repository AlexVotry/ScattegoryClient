import React from 'react';
import { getContext, getProvider } from './helper';

const LetterContext = React.createContext({});

function useLetter() {
  return getContext(LetterContext, 'LetterContext');
};

function LetterProvider(props: any) {
  const [letter, setLetter] = React.useState('');
  return getProvider(LetterContext, letter, setLetter, props);
}

export default { LetterProvider, useLetter };
