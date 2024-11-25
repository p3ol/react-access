import type { Poool } from 'poool-access';
import type { ForwardedProps } from '@junipero/react';
import {
  type ComponentPropsWithoutRef,
  type MutableRefObject,
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

export declare interface PaywallProps extends Pick<
  AccessContextValue,
  'events' | 'config' | 'texts' | 'styles' | 'variables'
>, ComponentPropsWithoutRef<'div'> {
  /**
   * Ref to the content
   */
  contentRef?: MutableRefObject<RestrictedContentRef>;
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

export declare interface PaywallRef {
  containerRef: MutableRefObject<HTMLDivElement>;
  recreate: () => void;
  create: () => void;
  destroy: (container: HTMLElement) => void;
}

const Paywall = forwardRef<PaywallRef, PaywallProps>(({
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
  const paywallRef = useRef<Poool.AccessFactory>();
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
    } catch (_) {}
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
}) as ForwardedProps<PaywallRef, PaywallProps>;

Paywall.displayName = 'Paywall';

export default Paywall;
