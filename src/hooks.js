import { useContext } from 'react';

import { DefaultContext } from './contexts';

export const usePoool = () => {
  const { appId, lib, config, styles, texts } = useContext(DefaultContext);

  return { poool: lib, appId, config, styles, texts };
};
