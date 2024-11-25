import type { Poool } from 'poool-access';
import {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { type StateReducer, mockState } from '@junipero/core';

import type {
  AuditEvents,
  EventCallback,
  EventCallbackFunction,
  EventCallbackObject,
} from '../types';
import { type AuditContextValue, AuditContext as Ctx } from '../contexts';
import { loadScript } from '../utils';

export interface AuditContextProps
  extends AuditContextValue, ComponentPropsWithoutRef<any> {
  /**
   * Maximum time for the Audit script to load
   * @default 2000
   */
  scriptLoadTimeout?: number;
}

export interface AuditContextState {
  lib?: Poool.Audit;
}

const AuditContext = ({
  appId,
  config,
  events,
  scriptUrl = 'https://assets.poool.fr/audit.min.js',
  scriptLoadTimeout = 2000,
  ...rest
}: AuditContextProps) => {
  const [state, dispatch] = useReducer<
    StateReducer<AuditContextState>
  >(mockState, {
    lib: null,
  });

  useEffect(() => {
    init();

    return () => {
      deinit();
    };
  }, [config?.cookies_enabled]);

  const init = async () => {
    if (
      (!globalThis.Audit || !globalThis.Audit.isPoool) &&
      (!globalThis.PooolAudit || !globalThis.PooolAudit.isPoool)
    ) {
      await loadScript(scriptUrl, 'poool-react-audit-lib', {
        timeout: scriptLoadTimeout,
      });
    }

    const auditRef = globalThis.PooolAudit || globalThis.Audit;
    const lib = auditRef.noConflict().init(appId).config(config);

    Object
      .entries(events || {})
      .forEach(([
        event,
        callback,
      ]: [
        Poool.EventsList,
        EventCallback<typeof events[keyof typeof events]>,
      ]) => {
        if ((callback as EventCallbackObject<typeof event>).once) {
          lib.once(event,
            (callback as EventCallbackObject<typeof event>).callback);
        } else {
          lib.on(event, callback as EventCallbackFunction<typeof event>);
        }
      });

    lib.once('identityAvailable', onIdentityAvailable);

    dispatch({ lib });
  };

  const deinit = () => {
    Object
      .entries(events || {})
      .forEach(([
        event,
        callback,
      ]: [
        Poool.EventsList,
        EventCallback<typeof events[keyof typeof events]>,
      ]) => {
        state.lib?.off(
          event,
          (callback as EventCallbackObject<typeof event>).callback ||
            (callback as EventCallbackFunction<typeof event>)
        );
      });

    state.lib?.off('identityAvailable', onIdentityAvailable);
  };

  const onIdentityAvailable = (
    e: Parameters<
      Extract<AuditEvents['identityAvailable'], EventCallbackFunction<any>>
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

  const getContext = useCallback(() => ({
    appId,
    config,
    events,
    scriptUrl,
    lib: state.lib,
  }), [state.lib, config?.cookies_enabled]);

  return (
    <Ctx.Provider value={getContext()} { ...rest } />
  );
};

AuditContext.displayName = 'AuditContext';

export default AuditContext;
