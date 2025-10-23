import type { Poool } from 'poool-access';
import {
  type ComponentPropsWithoutRef,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useReducer,
} from 'react';
import { classNames, mergeDeep, mockState } from '@junipero/core';

import type { EventCallback } from '../types';
import type { AccessContextValue } from '../contexts';
import { generateId } from '../utils';
import { useAccess } from '../hooks';

export declare interface PaywallRef {
  containerRef: RefObject<HTMLElement>;
  recreate: () => void;
  create: () => void;
  destroy: (container: HTMLElement) => void;
}

export declare interface PaywallProps
  extends AccessContextValue, Omit<ComponentPropsWithoutRef<'div'>, 'onError'> {
  /**
   * Ref to the paywall
   */
  ref?: RefObject<PaywallRef>;
  /**
   * Optional unique paywall id. When released, the snippet with the same id
   * will be hidden, and the corresponding restricted content will be displayed.
   */
  id?: string;
  /**
   * The current page type
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  pageType?: Parameters<Poool.AccessFactory['createPaywall']>[0]['pageType'];

  eventsMergeStrategy?: 'replace' | 'combine';
  valuesMergeStrategy?: 'merge' | 'mergeDeep';
}

export interface PaywallState {
  loaded: boolean;
}

const Paywall = forwardRef<
  PaywallRef,
  PaywallProps
>(({
  id,
  children,
  className,
  config,
  texts,
  styles,
  variables,
  pageType = 'premium',
  eventsMergeStrategy = 'replace',
  valuesMergeStrategy = 'merge',
  onIdentityAvailable,
  onLock,
  onReady,
  onRelease,
  onPaywallSeen,
  onRegister,
  onFormSubmit,
  onSubscribeClick,
  onLoginClick,
  onDiscoveryLinkClick,
  onCustomButtonClick,
  onDataPolicyClick,
  onAlternativeClick,
  onAnswer,
  onResize,
  onError,
  ...rest
}, ref) => {
  const paywallRef = useRef<Poool.AccessFactory>(undefined);
  const containerRef = useRef<HTMLDivElement>(undefined);
  const [state, dispatch] = useReducer(mockState<PaywallState>, {
    loaded: false,
  });

  const {
    lib,
    appId,
    config: factoryConfig,
    texts: factoryTexts,
    styles: factoryStyles,
    variables: factoryVariables,
    onIdentityAvailable: factoryOnIdentityAvailable,
    onLock: factoryOnLock,
    onReady: factoryOnReady,
    onRelease: factoryOnRelease,
    onPaywallSeen: factoryOnPaywallSeen,
    onRegister: factoryOnRegister,
    onFormSubmit: factoryOnFormSubmit,
    onSubscribeClick: factoryOnSubscribeClick,
    onLoginClick: factoryOnLoginClick,
    onDiscoveryLinkClick: factoryOnDiscoveryLinkClick,
    onCustomButtonClick: factoryOnCustomButtonClick,
    onDataPolicyClick: factoryOnDataPolicyClick,
    onAlternativeClick: factoryOnAlternativeClick,
    onAnswer: factoryOnAnswer,
    onResize: factoryOnResize,
    onError: factoryOnError,
    // Internals
    _releaseContent,
  } = useAccess();

  const cookiesEnabled = useMemo(() => (
    factoryConfig?.cookies_enabled ?? config?.cookies_enabled
  ), [factoryConfig?.cookies_enabled, config?.cookies_enabled]);

  useImperativeHandle(ref, () => ({
    containerRef,
    recreate,
    create,
    destroy,
  }));

  const onCustomReady = useCallback(() => {
    dispatch({ loaded: true });
  }, []);

  const onCustomRelease = useCallback(() => {
    _releaseContent?.(id || true);
  }, [id, _releaseContent]);

  const combineEvents = useCallback(function combineEvents<E> (
    eventCallback?: EventCallback<E>,
    factoryEventCallback?: EventCallback<E>,
  ): EventCallback<E> {
    return (evt: E) => {
      if (eventsMergeStrategy === 'replace') {
        return (eventCallback ?? factoryEventCallback)?.(evt, ref);
      } else {
        factoryEventCallback?.(evt, ref);

        return eventCallback?.(evt, ref);
      }
    };
  }, [ref, eventsMergeStrategy]);

  const combineValues = useCallback (function combineValues<V> (
    value?: V,
    factoryValue?: V,
  ): V {
    if (valuesMergeStrategy === 'merge') {
      return { ...factoryValue, ...value } as V;
    } else {
      return mergeDeep(factoryValue, value) as V;
    }
  }, [valuesMergeStrategy]);

  const create = useCallback(() => {
    if (!lib || typeof cookiesEnabled === 'undefined') {
      return;
    }

    paywallRef.current = lib
      .init(appId)
      .config(combineValues(config, factoryConfig))
      .texts(combineValues(texts, factoryTexts))
      .styles(combineValues(styles, factoryStyles))
      .variables(combineValues(variables, factoryVariables))
      .on('identityAvailable',
        combineEvents(onIdentityAvailable, factoryOnIdentityAvailable))
      .on('lock', combineEvents(onLock, factoryOnLock))
      .on('ready', combineEvents(onReady, factoryOnReady))
      .on('release', combineEvents(onRelease, factoryOnRelease))
      .on('paywallSeen', combineEvents(onPaywallSeen, factoryOnPaywallSeen))
      .on('register', combineEvents(onRegister, factoryOnRegister))
      .on('formSubmit', combineEvents(onFormSubmit, factoryOnFormSubmit))
      .on('subscribeClick',
        combineEvents(onSubscribeClick, factoryOnSubscribeClick))
      .on('loginClick', combineEvents(onLoginClick, factoryOnLoginClick))
      .on('discoveryLinkClick',
        combineEvents(onDiscoveryLinkClick, factoryOnDiscoveryLinkClick))
      .on('customButtonClick',
        combineEvents(onCustomButtonClick, factoryOnCustomButtonClick))
      .on('dataPolicyClick',
        combineEvents(onDataPolicyClick, factoryOnDataPolicyClick))
      .on('alternativeClick',
        combineEvents(onAlternativeClick, factoryOnAlternativeClick))
      .on('answer', combineEvents(onAnswer, factoryOnAnswer))
      .on('error', combineEvents(onError, factoryOnError))
      // Internals
      // @ts-expect-error Not public
      .on('resize', combineEvents(onResize, factoryOnResize));

    // paywallRef.current.once('identityAvailable', onIdentityAvailable);
    paywallRef.current.once('release', onCustomRelease);

    paywallRef.current.createPaywall({
      pageType,
      target: containerRef.current,
      mode: 'custom',
    });

    dispatch({ loaded: true });
  }, [
    lib, appId,
    pageType, config, texts, styles, variables,
    factoryConfig, factoryTexts, factoryStyles, factoryVariables,
    onCustomRelease,
    combineEvents, combineValues,
    onIdentityAvailable, factoryOnIdentityAvailable,
    onLock, factoryOnLock,
    onReady, factoryOnReady,
    onRelease, factoryOnRelease,
    onPaywallSeen, factoryOnPaywallSeen,
    onRegister, factoryOnRegister,
    onFormSubmit, factoryOnFormSubmit,
    onSubscribeClick, factoryOnSubscribeClick,
    onLoginClick, factoryOnLoginClick,
    onDiscoveryLinkClick, factoryOnDiscoveryLinkClick,
    onCustomButtonClick, factoryOnCustomButtonClick,
    onDataPolicyClick, factoryOnDataPolicyClick,
    onAlternativeClick, factoryOnAlternativeClick,
    onAnswer, factoryOnAnswer,
    onResize, factoryOnResize,
    onError, factoryOnError,
    cookiesEnabled,
  ]);

  const destroy = useCallback(async (container: HTMLElement) => {
    if (!paywallRef.current) {
      return;
    }

    container.innerHTML = '';
    const factory = paywallRef.current;
    factory.off('release', onCustomRelease);
    paywallRef.current = null;
  }, [onCustomRelease]);

  useEffect(() => {
    if (state.loaded) {
      return;
    }

    create();

    const container = containerRef.current;

    return () => {
      destroy(container);
    };
  }, [lib, state.loaded, create, destroy]);

  const recreate = useCallback(async () => {
    await destroy(containerRef.current);
    create();
  }, [destroy, create]);

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
