import { useContext } from 'react';

import { DefaultContext } from './contexts';

export const usePoool = () => {
  const {
    appId, lib, config = {}, styles = {}, texts = {},
  } = useContext(DefaultContext);

  if (!lib || !global.poool) {
    global.poool = global.poool || function () {
      global.poool._q = global.poool._q || [];
      global.poool.push(arguments);
    };
  }

  return { poool: lib || global.poool, appId, config, styles, texts };
};
