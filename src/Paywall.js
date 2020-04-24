import React, { useEffect, useContext, useRef } from 'react';

import { classNames, generateId } from './utils';
import { DefaultContext } from './contexts';

export default ({
  className,
  id = generateId(),
  pageType = 'premium',
  events = {},
  scriptUrl = 'https://assets.poool.fr/poool.min.js',
  doc = typeof document !== 'undefined' ? document : global,
  win = typeof window !== 'undefined' ? window : global,
  beforeInit = () => {},
}) => {
  const paywallWrapperRef = useRef();
  const {
    appId,
    config,
    styles,
    texts,
    container,
  } = useContext(DefaultContext);

  useEffect(() => {
    if (container && paywallWrapperRef.current) {
      init();
    }

    return () => deinit();
  }, [container, paywallWrapperRef.current]);

  const loadScript = () => new Promise((resolve, reject) => {
    /* eslint-disable comma-spacing, space-infix-ops, no-sequences, semi */
    !function(w,d,s,u,p,y,z,t,o) {
      w[p]=w[p]||function() {(w[p]._q=w[p]._q||[]).push(arguments)},
      t=d.createElement(s),o=d.getElementsByTagName(s)[0],
      t.async=1,t.onload=y,t.src=u,t.onerror=z,o.parentNode.insertBefore(t,o);
    }(win, doc, 'script', scriptUrl, 'poool', resolve, reject);
    /* eslint-enable */
  });

  const init = async () => {
    await loadScript();

    if (typeof win.poool === 'undefined') {
      return;
    }

    win.poool('init', appId);
    win.poool('config', config);
    win.poool('styles', styles);
    win.poool('texts', texts);
    Object.entries(events).map(([k, v]) => win.poool('event', k, v));
    win.poool('config', {
      post_container:`[id='${container}']`,
      widget_container: `[id='${paywallWrapperRef.current.id}']`,
    });
    beforeInit(win.poool);
    win.poool('send', 'page-view', pageType);
  };

  const deinit = async () => {
    if (typeof win.poool === 'undefined') {
      return;
    }

    Object.entries(events).map(([k, v]) => win.poool('unevent', k, v));

    await win.poool.flush?.();
  };

  return (
    <div
      ref={paywallWrapperRef}
      id={id}
      className={classNames('poool-widget', className)}
    />
  );
};
