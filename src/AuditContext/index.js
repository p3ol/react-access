import { useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { mockState } from '@poool/junipero-utils';

import { AuditContext as Ctx } from '../contexts';
import { loadScript } from '../utils';

const AuditContext = ({
  appId,
  config,
  events,
  scriptUrl = 'https://assets.poool.fr/audit.min.js',
  ...rest
}) => {
  const [state, dispatch] = useReducer(mockState, {
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
      !globalThis.Audit ||
      !globalThis.Audit.isPoool ||
      !globalThis.PooolAudit ||
      !globalThis.PooolAudit.isPoool
    ) {
      await loadScript(scriptUrl, 'poool-react-audit-lib');
    }

    const auditRef = globalThis.PooolAudit || globalThis.Audit;
    const lib = auditRef.noConflict().init(appId).config(config);

    Object.entries(events || {}).forEach(([event, callback]) => {
      if (callback.once) {
        lib.once(event, callback.callback);
      } else {
        lib.on(event, callback);
      }
    });

    lib.once('identityAvailable', onIdentityAvailable);

    dispatch({ lib });
  };

  const deinit = () => {
    Object.entries(events || {}).forEach(([event, callback]) => {
      state.lib?.off(event, callback.callback || callback);
    });

    state.lib?.off('identityAvailable', onIdentityAvailable);
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
AuditContext.propTypes = {
  appId: PropTypes.string.isRequired,
  config: PropTypes.object,
  events: PropTypes.object,
  scriptUrl: PropTypes.string,
};

export default AuditContext;
