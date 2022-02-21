import { useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { mockState, mergeDeep } from '@poool/junipero-utils';

import { AccessContext as Ctx } from './contexts';
import { loadScript } from './utils';
import AuditContext from './AuditContext';

const AccessContext = ({
  appId,
  config,
  texts,
  styles,
  events,
  variables,
  scriptUrl = 'https://assets.poool.fr/access.min.js',
  withAudit = false,
  ...rest
}) => {
  const [state, dispatch] = useReducer(mockState, {
    lib: null,
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (
      !globalThis.Access ||
      !globalThis.Access.isPoool ||
      !globalThis.PooolAccess ||
      !globalThis.PooolAccess.isPoool
    ) {
      await loadScript(scriptUrl, 'poool-react-access-lib');
    }

    const lib = globalThis.Access.noConflict();
    dispatch({ lib });
  };

  const createFactory = (opts = {}) => {
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
      .forEach(([event, callback]) => {
        if (callback.once) {
          factory.once(event, callback.callback);
        } else {
          factory.on(event, callback);
        }
      });

    return factory;
  };

  const destroyFactory = factory => {
    if (!factory) {
      return;
    }

    Object.entries(events || {}).forEach(([event, callback]) => {
      factory?.off(event, callback.callback || callback);
    });
    factory.destroy();
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
      <AuditContext appId={appId} config={config}>{ content }</AuditContext>
    );
  }

  return content;
};

AccessContext.displayName = 'AccessContext';
AccessContext.propTypes = {
  appId: PropTypes.string.isRequired,
  config: PropTypes.object,
  texts: PropTypes.object,
  styles: PropTypes.object,
  events: PropTypes.object,
  variables: PropTypes.object,
  scriptUrl: PropTypes.string,
  withAudit: PropTypes.bool,
};

export default AccessContext;
