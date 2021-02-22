import React, { useEffect, useContext, useRef, useState } from 'react';

import { classNames, generateId } from './utils';
import { DefaultContext } from './contexts';

export default ({
  className,
  id,
  pageType = 'premium',
  events = {},
  beforeInit,
  beforeUnmount,
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
  const [loading, setLoading] = useState(false);

  /* istanbul ignore next: tested within puppeteer */
  useEffect(() => {
    if (container && paywallWrapperRef.current) {
      init();
    }

    return () => deinit();
  }, [lib, paywallWrapperRef.current]);

  /* istanbul ignore next: tested within puppeteer */
  useEffect(() => {
    if (!loading && config?.cookies_enabled) {
      init();
    }
  }, [config?.cookies_enabled]);

  const onReady = () => {
    setLoading(false);
  };

  /* istanbul ignore next: tested within puppeteer */
  const init = async () => {
    if (!lib) {
      return;
    }

    setLoading(true);

    lib('init', appId);
    lib('styles', styles);
    lib('texts', texts);
    lib('config', {
      ...(config || {}),
      post_container: `[id='${container}']`,
      widget_container: `[id='${paywallWrapperRef.current.id}']`,
    });

    Object.entries(events || {}).map(([k, v]) => lib('event', k, v));

    lib('event', 'onReady', onReady);

    beforeInit?.(lib);
    lib('send', 'page-view', pageType);
  };

  /* istanbul ignore next: tested within puppeteer */
  const deinit = async () => {
    if (!lib) {
      return;
    }

    beforeUnmount?.(lib);
    Object.entries(events || {}).map(([k, v]) => lib('unevent', k, v));
    lib('unevent', 'onReady', onReady);
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
