import { useContext, useEffect, useRef } from 'react';

import { DefaultContext } from './contexts';

export const usePoool = ({
  win = typeof window !== 'undefined'
    ? window : /* istanbul ignore next: ssr edge case */ global,
} = {}) => {
  const {
    appId, lib, config = {}, styles = {}, texts = {},
  } = useContext(DefaultContext);

  if (win && (!lib || !win.poool)) {
    win.poool = win.poool || function () {
      win.poool._q = win.poool._q || [];
      win.poool._q.push(arguments);
    };
  }

  return { poool: lib || win.poool, appId, config, styles, texts };
};

export const useTimeout = (cb, time, changes = []) => {
  const returnedCallbackRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      returnedCallbackRef.current = cb();
    }, time);

    return () => {
      clearTimeout(timeout);
      returnedCallbackRef.current?.();
    };
  }, changes);
};
