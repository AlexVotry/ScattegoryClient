// displays the timer.
import React, {useContext, useEffect, useState} from 'react';

import TimerContext from '../contexts/TimerContext';
import { pad } from '../service/strings'

const Timer = () => {
  const [timer, setTimer] = TimerContext.useTimer();
  let clock = "timer";
  if (timer < 11) {
    clock = "blink";
  }

  const digitStyle = {
    display: 'inline-block'
  };

  const minStyle = {
    ...digitStyle,
    marginRight: '20px'
  } 
  const secStyle = {
    ...digitStyle,
    width: '60px'
  }
  const minutes = Math.floor(timer / 60);
  const min = minutes > 0 ? `${minutes} : ` : '';
  const seconds = timer === 0 ? ' ' : pad(timer % 60).toString().split('');

  if (timer === 0) return <div></div>

  return (
    <div className={clock}>
      <div style={{float: 'right'}}>
        <span style={minStyle}>{min}</span>
        <span style={secStyle}>{seconds[0]}</span>
        <span style={secStyle}>{seconds[1]}</span>
      </div>
    </div>
  )
};

export default Timer;