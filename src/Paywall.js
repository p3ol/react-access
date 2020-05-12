import React, { useEffect, useContext, useRef } from 'react';

import { classNames, generateId } from './utils';
import { DefaultContext } from './contexts';

export default ({
  className,
  id,
  pageType = 'premium',
  events = {},
  scriptUrl = 'https://assets.poool.fr/poool.min.js',
  doc = typeof document !== 'undefined'
    ? document : /* istanbul ignore next: ssr edge case */global,
  win = typeof window !== 'undefined'
    ? window : /* istanbul ignore next: ssr edge case */ global,
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
  } = useContext(DefaultContext);

  /* istanbul ignore next: tested within puppeteer */
  useEffect(() => {
    if (container && paywallWrapperRef.current) {
      init();
    }

    return () => deinit();
  }, [paywallWrapperRef.current]);

  /* istanbul ignore next: tested within puppeteer */
  const loadScript = () => new Promise((resolve, reject) => {
    /* eslint-disable comma-spacing, space-infix-ops, no-sequences, semi */
    !function(w,d,s,u,p,y,z,t,o) {
      w[p]=w[p]||function() {(w[p]._q=w[p]._q||[]).push(arguments)},
      t=d.createElement(s),o=d.getElementsByTagName(s)[0],
      t.async=1,t.onload=y,t.src=u,t.onerror=z,o.parentNode.insertBefore(t,o);
    }(win, doc, 'script', scriptUrl, 'poool', resolve, reject);
    /* eslint-enable */
  });

  /* istanbul ignore next: tested within puppeteer */
  const init = async () => {
    await loadScript();

    if (typeof win.poool === 'undefined') {
      return;
    }

    win.poool('init', appId);
    win.poool('styles', styles);
    win.poool('texts', texts);
    win.poool('config', {
      ...config,
      post_container:`[id='${container}']`,
      widget_container: `[id='${paywallWrapperRef.current.id}']`,
    });
    Object.keys(events).map(k => win.poool('event', k, events[k]));
    beforeInit?.(win.poool);
    win.poool('send', 'page-view', pageType);
  };

  /* istanbul ignore next: tested within puppeteer */
  const deinit = async () => {
    if (typeof win.poool === 'undefined') {
      return;
    }

    Object.keys(events).map(k => win.poool('unevent', k, events[k]));

    await win.poool.flush?.();
  };

  return (
    <div
      ref={paywallWrapperRef}
      id={paywallIdRef.current}
      className={classNames('poool-widget', className)}
    />
  );
};
