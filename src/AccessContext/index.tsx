import type { Poool } from 'poool-access';
import {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { mockState, mergeDeep } from '@junipero/core';

import type {
  AccessEvents,
  EventCallback,
  EventCallbackFunction,
  EventCallbackObject,
} from '../types';
import { type AccessContextValue, AccessContext as Ctx } from '../contexts';
import { loadScript } from '../utils';
import AuditContext from '../AuditContext';

export interface AccessContextProps
  extends AccessContextValue, ComponentPropsWithoutRef<any> {
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
}

export interface AccessContextState {
  lib?: Poool.Access;
}

const AccessContext = ({
  appId,
  config,
  texts,
  styles,
  events,
  variables,
  scriptUrl = 'https://assets.poool.fr/access.min.js',
  scriptLoadTimeout = 2000,
  withAudit = false,
  ...rest
}: AccessContextProps) => {
  const [state, dispatch] = useReducer(mockState<AccessContextState>, {
    lib: null,
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (
      (!globalThis.Access || !globalThis.Access.isPoool) &&
      (!globalThis.PooolAccess || !globalThis.PooolAccess.isPoool)
    ) {
      await loadScript(scriptUrl, 'poool-react-access-lib', {
        timeout: scriptLoadTimeout,
      });
    }

    const accessRef = globalThis.PooolAccess || globalThis.Access;
    const lib = accessRef.noConflict();
    dispatch({ lib });
  };

  const createFactory = (
    opts: Pick<
      AccessContextValue,
      'config' | 'texts' | 'styles' | 'variables' | 'events'
    > = {}
  ) => {
    if (!state.lib) {
      return;
    }

    const factory = state.lib
      .init(appId)
      .config(mergeDeep({}, config, opts.config))
      .texts(mergeDeep({}, texts, opts.texts))
      .styles(mergeDeep({}, styles, opts.styles))
      .variables(mergeDeep({}, variables, opts.variables));

    Object
      .entries(events || {})
      .concat(Object.entries(opts.events || {}))
      .forEach(([
        event,
        callback,
      ]: [
        Poool.EventsList,
        EventCallback<typeof events[keyof typeof events]>,
      ]) => {
        if ((callback as EventCallbackObject<typeof event>).once) {
          factory.once(event,
            (callback as EventCallbackObject<typeof event>).callback);
        } else {
          factory.on(event, callback as EventCallbackFunction<typeof event>);
        }
      });

    return factory;
  };

  const destroyFactory = (factory: Poool.AccessFactory) => {
    if (!factory) {
      return;
    }

    Object.keys(events || {}).forEach((event: keyof AccessEvents) => {
      factory?.off(event, events[event].callback || events[event]);
    });

    return factory.destroy();
  };

  const getContext = useCallback(() => ({
    appId,
    config,
    texts,
    styles,
    events,
    variables,
    scriptUrl,
    lib: state.lib,
    createFactory,
    destroyFactory,
  }), [state.lib, config?.cookies_enabled]);

  const content = (
    <Ctx.Provider value={getContext()} { ...rest } />
  );

  if (withAudit) {
    return (
      <AuditContext appId={appId} config={config}>
        { content }
      </AuditContext>
    );
  }

  return content;
};

AccessContext.displayName = 'AccessContext';

export default AccessContext;
