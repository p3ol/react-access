import React, { useEffect, useContext, useRef } from 'react';

import { classNames } from './utils';
import { DefaultContext } from './contexts';

export default ({
  className,
  pageType = 'premium',
  events = {},
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
    if (container) {
      init();
    }

    return () => deinit();
  }, [container]);

  const loadScript = () => new Promise((resolve, reject) => {
    /* eslint-disable */
    !function(w,d,s,u,p,y,z,t,o){
        w[p]=w[p]||function(){(w[p]._q=w[p]._q||[]).push(arguments)},
        t=d.createElement(s),o=d.getElementsByTagName(s)[0],
        t.async=1,t.src=u,t.onload=y,t.onerror=z,o.parentNode.insertBefore(t,o)
    }(window, document, "script", 'https://front.poool-staging.fr/poool.js', "poool", resolve, reject);
    /* eslint-enable */
  });

  const init = async () => {
    await loadScript();

    if (typeof window.poool === 'undefined') {
      return;
    }

    window.poool('init', appId);
    window.poool('config', config);
    window.poool('styles', styles);
    window.poool('texts', texts);
    Object.entries(events).map(([k, v]) => window.poool('event', k, v));
    window.poool('config', 'post_container', container);
    window.poool('config', 'widget_container', paywallWrapperRef.current);
    beforeInit(window.poool);
    await window.poool('send', 'page-view', pageType);
  };

  const deinit = async () => {
    if (typeof window.poool === 'undefined') {
      return;
    }

    Object.entries(events).map(([k, v]) => window.poool('unevent', k, v));

    await window.poool.flush();
  };

  return (
    <div
      ref={paywallWrapperRef}
      className={classNames('poool-widget', className)}
    />
  );
};
