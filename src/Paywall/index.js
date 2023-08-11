import {
  useEffect,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';

import { useAccess } from '../hooks';
import { generateId } from '../utils';

const Paywall = forwardRef(({
  id,
  events,
  contentRef,
  children,
  config,
  texts,
  styles,
  variables,
  pageType = 'premium',
}, ref) => {
  const paywallRef = useRef();
  const containerRef = useRef();
  const {
    lib,
    createFactory,
    destroyFactory,
    config: globalConfig,
  } = useAccess();

  useImperativeHandle(ref, () => ({
    containerRef,
    recreate,
    create,
    destroy,
  }));

  useEffect(() => {
    create();

    const container = containerRef.current;

    return () => {
      destroy(container);
    };
  }, [lib, globalConfig?.cookies_enabled]);

  const create = () => {
    paywallRef.current = createFactory?.({
      events,
      config,
      texts,
      styles,
      variables,
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

  const destroy = async container => {
    if (!paywallRef.current) {
      return;
    }

    container.innerHTML = '';
    paywallRef.current.off('identityAvailable', onIdentityAvailable);
    await destroyFactory?.(paywallRef.current);
    paywallRef.current = null;
  };

  const recreate = async () => {
    await destroy(containerRef.current);
    create();
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
});

Paywall.displayName = 'Paywall';
Paywall.propTypes = {
  contentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
  children: PropTypes.element,
  config: PropTypes.object,
  texts: PropTypes.object,
  styles: PropTypes.object,
  events: PropTypes.object,
  variables: PropTypes.object,
  id: PropTypes.string,
  pageType: PropTypes.oneOf([
    'premium', 'free', 'page', 'subscription', 'registration',
  ]),
};

export default Paywall;
