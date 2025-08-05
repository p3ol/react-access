import type { Poool } from 'poool-access';
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useAudit } from '../hooks';

export interface PixelProps extends ComponentPropsWithoutRef<any> {
  /**
   * The event type
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/methods
   */
  type: Parameters<Poool.Audit['sendEvent']>[0];
  /**
   * The event data
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/methods
   */
  data?: Parameters<Poool.Audit['sendEvent']>[1];
  /**
   * The audit config options
   *
   * More infos: https://www.poool.dev/docs/audit/javascript/audit/configuration
   */
  config?: Poool.AuditConfigOptions;
  /**
   * the event options
   *
   * more infos: https://www.poool.dev/docs/access/javascript/audit/methods
   */
  options?: Parameters<Poool.Audit['sendEvent']>[2];
  /**
   * Callback to execute when the event is done
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  onDone?: () => void;
  /**
   * Whether to reuse the same event or not
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  reuse?: boolean;
}

const Pixel = ({
  type,
  data,
  config,
  options,
  onDone,
  reuse = false,
}: PixelProps): ReactNode => {
  const { lib: Audit_, config: auditConfig } = useAudit();
  const [used, setUsed] = useState(false);

  const send = useCallback(async () => {
    if (!Audit_ || (used && !reuse)) {
      return;
    }

    await Audit_.config(config || {}).sendEvent(type, data, options);
    setUsed(true);
    onDone?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Audit_, used]);

  useEffect(() => {
    send();
  }, [Audit_, auditConfig?.cookies_enabled, send]);

  return null;
};

Pixel.displayName = 'Pixel';

export default Pixel;
