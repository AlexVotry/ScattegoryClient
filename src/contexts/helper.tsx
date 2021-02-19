import React from 'react';

/**
 * @function getContext - method for getting context inside a Provider
 * @returns {array} context value, which is a state of [value, setter].
 */
export const getContext = (thisContext: React.Context<any>, provider: string) => {
  const context = React.useContext(thisContext);

  if (!context) {
    throw new Error(`Needs ${provider}`)
  }

  return context;
}

/**
 * @function getProvider - create the context provider for any specific Context
 * @param thisContext - React.Context 
 * @param state - pass state from specific context
 * @param setState - pass setState method for specific context
 * @param props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
export const getProvider = (
  thisContext: React.Context<any>,
  state: any,
  setState: React.Dispatch<React.SetStateAction<any>>,
  props: any
) => {

  // useMemo hooks makes sure we don't recalculate unnecessarily (memoization)
  const value = React.useMemo(() => [state, setState], [state]);

  return <thisContext.Provider value={value} {...props} />;
}