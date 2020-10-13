import React, { useEffect, useContext, useRef } from 'react';

import { classNames, generateId } from './utils';
import { DefaultContext } from './contexts';

export default ({
  className,
  id,
  pageType = 'premium',
  events = {},
  beforeInit,
}) => {
  const paywallIdRef = useRef(id || generateId());
  const paywallWrapperRef = useRef();
  const {
    appId,
    config,
    styles,
    texts,
    container,
    lib,
  } = useContext(DefaultContext);

  /* istanbul ignore next: tested within puppeteer */
  useEffect(() => {
    if (container && paywallWrapperRef.current) {
      init();
    }

    return () => deinit();
  }, [lib, paywallWrapperRef.current]);

  /* istanbul ignore next: tested within puppeteer */
  const init = async () => {
    if (!lib) {
      return;
    }

    lib('init', appId);
    lib('styles', styles);
    lib('texts', texts);
    lib('config', {
      ...config,
      post_container: `[id='${container}']`,
      widget_container: `[id='${paywallWrapperRef.current.id}']`,
    });
    Object.keys(events).map(k => lib('event', k, events[k]));
    beforeInit?.(lib);
    lib('send', 'page-view', pageType);
  };

  /* istanbul ignore next: tested within puppeteer */
  const deinit = async () => {
    if (!lib) {
      return;
    }

    Object.keys(events).map(k => lib('unevent', k, events[k]));

    await lib('flush');
  };

  return (
    <div
      ref={paywallWrapperRef}
      id={paywallIdRef.current}
      className={classNames('poool-widget', className)}
    />
  );
};
