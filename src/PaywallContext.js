import React, { useReducer, useEffect } from 'react';

import { mockState, loadScript } from './utils';
import { DefaultContext } from './contexts';

export default ({
  appId,
  config = {},
  styles = {},
  texts = {},
  scriptUrl = 'https://assets.poool.fr/poool.min.js',
  doc = typeof document !== 'undefined'
    ? document : /* istanbul ignore next: ssr edge case */global,
  win = typeof window !== 'undefined'
    ? window : /* istanbul ignore next: ssr edge case */ global,
  children,
}) => {
  const [state, dispatch] = useReducer(mockState, {
    container: null,
    lib: null,
    config,
    appId,
    styles,
    texts,
    setContent: container => dispatch({ container }),
  });

  useEffect(() => {
    init();
  }, [appId]);

  const init = async () => {
    if (state.lib) {
      return;
    }

    await loadScript(scriptUrl, win, doc);
    state.lib = win.poool;
    dispatch({ lib: state.lib });
  };

  return (
    <DefaultContext.Provider
      value={state}
      children={children}
    />
  );
};
