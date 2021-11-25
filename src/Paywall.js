import { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { useAccess } from './hooks';
import { generateId } from './utils';

const Paywall = ({
  id,
  events,
  contentRef,
  children,
  pageType = 'premium',
}) => {
  const paywallRef = useRef();
  const containerRef = useRef();
  const {
    lib,
    createFactory,
    destroyFactory,
    config: globalConfig,
  } = useAccess();

  useEffect(() => {
    create();

    const container = containerRef.current;

    return () => {
      destroy(container);
    };
  }, [
    lib,
    containerRef.current,
    globalConfig?.cookies_enabled,
  ]);

  const create = () => {
    paywallRef.current = createFactory({
      events,
    });

    if (!paywallRef.current) {
      return;
    }

    paywallRef.current.once('identityAvailable', onIdentityAvailable);

    paywallRef.current.createPaywall({
      pageType,
      target: containerRef.current,
      content: contentRef?.current?.contentRef?.current,
      mode: contentRef?.current?.mode,
      percent: contentRef?.current?.percent,
    });
  };

  const destroy = container => {
    if (!paywallRef.current) {
      return;
    }

    container.innerHTML = '';
    paywallRef.current.off('identityAvailable', onIdentityAvailable);
    destroyFactory(paywallRef.current);
    paywallRef.current = null;
  };

  const onIdentityAvailable = e => {
    try {
      globalThis.document.dispatchEvent(new CustomEvent('$_poool.onMessage', {
        detail: {
          type: '$_poool.setUser',
          data: e,
        },
      }));
    } catch (_) {}
  };

  const customId = useMemo(() => generateId(), []);

  return (
    <>
      <div id={id || customId} ref={containerRef} className="poool-widget" />
      { children }
    </>
  );
};

Paywall.displayName = 'Paywall';
Paywall.propTypes = {
  contentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
  children: PropTypes.element,
  events: PropTypes.object,
  id: PropTypes.string,
  pageType: PropTypes.oneOf([
    'premium', 'free', 'page', 'subscription', 'registration',
  ]),
};

export default Paywall;
