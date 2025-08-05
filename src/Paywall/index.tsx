import type { Poool } from 'poool-access';
import {
  type ComponentPropsWithoutRef,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { classNames } from '@junipero/core';

import type { AccessEvents, EventCallbackFunction } from '../types';
import type { AccessContextValue } from '../contexts';
import type { RestrictedContentRef } from '../RestrictedContent';
import { generateId } from '../utils';
import { useAccess } from '../hooks';

export declare interface PaywallRef {
  containerRef: RefObject<HTMLElement>;
  recreate: () => void;
  create: () => void;
  destroy: (container: HTMLElement) => void;
}

export declare interface PaywallProps extends Pick<
  AccessContextValue,
  'events' | 'config' | 'texts' | 'styles' | 'variables'
>, ComponentPropsWithoutRef<'div'> {
  /**
   * Ref to the paywall
   */
  ref?: RefObject<PaywallRef>;
  /**
   * Ref to the content
   */
  contentRef?: RefObject<RestrictedContentRef | null>;
  /**
   * Custom wrapper component ID
   */
  id?: string;
  /**
   * The current page type
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  pageType?: Parameters<Poool.AccessFactory['createPaywall']>[0]['pageType'];
}

const Paywall = forwardRef<
  PaywallRef,
  PaywallProps
>(({
  id,
  events,
  contentRef,
  children,
  className,
  config,
  texts,
  styles,
  variables,
  pageType = 'premium',
  ...rest
}, ref) => {
  const paywallRef = useRef<Poool.AccessFactory>(undefined);
  const containerRef = useRef<HTMLDivElement>(undefined);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const destroy = async (container: HTMLElement) => {
    if (!paywallRef.current) {
      return;
    }

    container.innerHTML = '';
    const factory = paywallRef.current;
    factory.off('identityAvailable', onIdentityAvailable);
    paywallRef.current = null;
    await destroyFactory?.(factory);
  };

  const recreate = async () => {
    await destroy(containerRef.current);
    create();
  };

  const onIdentityAvailable = (
    e: Parameters<
      Extract<AccessEvents['identityAvailable'], EventCallbackFunction<any>>
    >[0]
  ) => {
    try {
      globalThis.document.dispatchEvent(new CustomEvent('$_poool.onMessage', {
        detail: {
          type: '$_poool.setUser',
          data: e,
        },
      }));
    } catch {}
  };

  const customId = useMemo(() => generateId(), []);

  return (
    <>
      <div
        id={id || customId}
        ref={containerRef}
        className={classNames('poool-widget', className)}
        { ...rest }
      />
      { children }
    </>
  );
});

Paywall.displayName = 'Paywall';

export default Paywall;
