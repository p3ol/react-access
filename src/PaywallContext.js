import React, { useReducer } from 'react';

import { mockState } from './utils';
import { DefaultContext } from './contexts';

export default ({
  appId,
  config = {},
  children,
}) => {
  const [state, dispatch] = useReducer(mockState, {
    container: null,
    config,
    setContent,
  });

  const setContent = ({ container, mode, percent } = {}) => {
    dispatch({ container, mode, percent });
  };

  return (
    <DefaultContext.Provider
      value={state}
      children={children}
    />
  );
};
