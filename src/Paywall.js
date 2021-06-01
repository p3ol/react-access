import React, { useEffect, useContext, useRef, useState } from 'react';

import { classNames, generateId } from './utils';
import { DefaultContext } from './contexts';
import { useTimeout } from './hooks';

export default ({
  className,
  id,
  pageType = 'premium',
  events = {},
  beforeInit,
  afterMount,
  beforeUnmount,
  initDelay = 10,
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
  useTimeout(() => {
    if (container && paywallWrapperRef.current) {
      init();
    }
  }, initDelay, [lib, container, config?.cookies_enabled]);

  useEffect(() => {
    return () => deinit();
  }, []);

  /* istanbul ignore next: tested within puppeteer */
  const onReady = () => {
    setLoading(false);
  };

  /* istanbul ignore next: tested within puppeteer */
  const init = async () => {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      !lib ||
      loading
    ) {
      return;
    }

    afterMount?.();
    setLoading(true);

    lib('init', appId);
    lib('styles', styles);
    lib('texts', texts);
    lib('config', {
      force_container_recovery: true,
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
      id={paywallWrapperRef.current?.id || paywallIdRef.current}
      className={classNames('poool-widget', className)}
    />
  );
};
