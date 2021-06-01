import React, { useReducer, useCallback, useEffect } from 'react';

import { mockState, loadScript } from './utils';
import { DefaultContext } from './contexts';

export default ({
  appId,
  config,
  styles,
  texts,
  doc,
  win,
  children,
  scriptUrl = 'https://assets.poool.fr/poool.min.js',
}) => {
  const [state, dispatch] = useReducer(mockState, {
    container: null,
    lib: null,
    config,
    appId,
    styles,
    texts,
  });

  const getContext = useCallback(() => ({
    ...state,
    init,
    setContent: container => dispatch({ container }),
  }), Object.values(state));

  useEffect(() => {
    init();
  }, [appId]);

  useEffect(() => {
    dispatch({ config });
  }, [config]);

  const init = async () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const win_ = win || typeof window !== 'undefined' ? window : global;
    const doc_ = doc || typeof document !== 'undefined' ? document : global;

    await loadScript(scriptUrl, win_, doc_);
    state.lib = win_.poool;
    dispatch({ lib: state.lib });
  };

  return (
    <DefaultContext.Provider
      value={getContext()}
      children={children}
    />
  );
};
