import type { Poool } from 'poool-access';
import {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useEffectEvent,
  useReducer,
} from 'react';
import { mockState } from '@junipero/core';

import { type AccessContextValue, AuditContextValue, AccessContext as Ctx } from '../contexts';
import { loadScript } from '../utils';
import AuditContext from '../AuditContext';

export interface AccessContextProps
  extends Omit<AccessContextValue, '_released' | '_releaseContent'>,
  ComponentPropsWithoutRef<any> {
  /**
   * Maximum time for the Access script to load
   * @default 2000
   */
  scriptLoadTimeout?: number;
  /**
   * Whether the access context should include audit or not
   * @default false
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  withAudit?: boolean;
  /**
   * Your pool Audit context props
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/audit/installation
   */
  auditProps?: Omit<AuditContextValue, 'lib'>;
}

export interface AccessContextState {
  lib?: Poool.Access;
  released: (string | boolean)[];
}

const AccessContext = ({
  appId,
  config,
  texts,
  styles,
  variables,
  auditProps,
  scriptUrl = 'https://assets.poool.fr/access.min.js',
  scriptLoadTimeout = 2000,
  withAudit = false,
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
}: AccessContextProps) => {
  const [state, dispatch] = useReducer(mockState<AccessContextState>, {
    lib: null,
    released: [],
  });

  const init = useEffectEvent(async () => {
    if (
      (!globalThis.Access?.isPoool) &&
      (!globalThis.PooolAccess?.isPoool)
    ) {
      await loadScript(scriptUrl, 'poool-react-access-lib', {
        timeout: scriptLoadTimeout,
      });
    }

    const accessRef = globalThis.PooolAccess || globalThis.Access;
    const lib = accessRef.noConflict();
    dispatch({ lib });
  });

  useEffect(() => {
    init();
  }, []);

  const releaseContent = useCallback((id: string | boolean) => {
    dispatch(s => ({ released: [...(s.released || []), id] }));
  }, []);

  // const createFactory = useCallback((
  //   opts: Pick<
  //     AccessContextValue,
  //     'config' | 'texts' | 'styles' | 'variables' | 'events'
  //   > = {}
  // ) => {
  //   if (!state.lib) {
  //     return;
  //   }

  //   const factory = state.lib
  //     .init(appId)
  //     .config(mergeDeep({}, config, opts.config))
  //     .texts(mergeDeep({}, texts, opts.texts))
  //     .styles(mergeDeep({}, styles, opts.styles))
  //     .variables(mergeDeep({}, variables, opts.variables));

  //   Object
  //     .entries(events || {})
  //     .concat(Object.entries(opts.events || {}))
  //     .forEach(([
  //       event,
  //       callback,
  //     ]: [
  //       Poool.EventsList,
  //       EventCallback<typeof events[keyof typeof events]>,
  //     ]) => {
  //       if ((callback as EventCallbackObject<typeof event>).once) {
  //         factory.once(event,
  //           (callback as EventCallbackObject<typeof event>).callback);
  //       } else {
  //         factory.on(event, callback as EventCallbackFunction<typeof event>);
  //       }
  //     });

  //   return factory;
  // }, [appId, config, texts, styles, variables, events, state.lib]);

  // const destroyFactory = useCallback((
  //   factory: Poool.AccessFactory
  // ): Promise<void> => {
  //   if (!factory) {
  //     return;
  //   }

  //   Object.keys(events || {}).forEach((event: keyof AccessEvents) => {
  //     factory?.off(event, events[event].callback || events[event]);
  //   });

  //   return factory.destroy();
  // }, [events]);

  const getContext = useCallback(() => ({
    appId,
    config,
    texts,
    styles,
    variables,
    scriptUrl,
    lib: state.lib,
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
    // Internals
    _released: state.released,
    _releaseContent: releaseContent,
  }), [
    state.lib,
    appId, config, texts, styles, variables, scriptUrl,
    state.released,
    releaseContent,
    onIdentityAvailable, onLock, onReady, onRelease, onPaywallSeen,
    onRegister, onFormSubmit, onSubscribeClick, onLoginClick,
    onDiscoveryLinkClick, onCustomButtonClick, onDataPolicyClick,
    onAlternativeClick, onAnswer, onResize, onError,
  ]);

  const content = (
    <Ctx.Provider value={getContext()} { ...rest } />
  );

  if (withAudit) {
    return (
      <AuditContext appId={appId} config={config} { ...auditProps }>
        { content }
      </AuditContext>
    );
  }

  return content;
};

AccessContext.displayName = 'AccessContext';

export default AccessContext;
