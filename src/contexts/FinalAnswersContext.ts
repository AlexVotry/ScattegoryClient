import React from 'react';
import { getContext, getProvider } from './helper';

const FinalAnswersContext = React.createContext({});

function useFinalAnswers() {
  return getContext(FinalAnswersContext, 'FinalAnswersContext');
};

function FinalAnswersProvider(props: any) {
  const [finalAnswers, setFinalAnswers] = React.useState({});
  return getProvider(FinalAnswersContext, finalAnswers, setFinalAnswers, props);
}

export default { FinalAnswersProvider, useFinalAnswers };
