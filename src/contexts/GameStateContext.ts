import React from 'react';
import { getContext, getProvider } from './helper';

const GameStateContext = React.createContext({});

function useGameState() {
  return getContext(GameStateContext, 'GameStateContext');
};

function GameStateProvider(props: any) {
  const [gameState, setGameState] = React.useState('ready');
  return getProvider(GameStateContext, gameState, setGameState, props);
}

export default { GameStateProvider, useGameState };
