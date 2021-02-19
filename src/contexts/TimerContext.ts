import React from 'react';
import { getContext, getProvider } from './helper';

const TimerContext = React.createContext({});

function useTimer() {
  return getContext(TimerContext, 'TimerContext');
};

function TimerProvider(props: any) {
  const [timer, setTimer] = React.useState('');
  return getProvider(TimerContext, timer, setTimer, props);
}

export default { TimerProvider, useTimer };
