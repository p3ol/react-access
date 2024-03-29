import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useAudit } from '../hooks';

const Pixel = ({
  type,
  data,
  config,
  options,
  onDone,
  reuse = false,
}) => {
  const { lib: Audit_, config: auditConfig } = useAudit();
  const [used, setUsed] = useState(false);

  useEffect(() => {
    send();
  }, [Audit_, auditConfig?.cookies_enabled]);

  const send = useCallback(async () => {
    if (!Audit_ || (used && !reuse)) {
      return;
    }

    await Audit_.config(config || {}).sendEvent(type, data, options);
    setUsed(true);
    onDone?.();
  }, [Audit_, used]);

  return null;
};

Pixel.displayName = 'Pixel';
Pixel.propTypes = {
  type: PropTypes.oneOf(['page-view']).isRequired,
  data: PropTypes.object,
  config: PropTypes.object,
  options: PropTypes.object,
  onDone: PropTypes.func,
  reuse: PropTypes.bool,
};

export default Pixel;
