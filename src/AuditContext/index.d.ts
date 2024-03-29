import { ComponentPropsWithoutRef } from 'react';
import { Poool } from 'poool-access';

import { eventCallback } from '../index';

export declare interface AuditEvents {
  /**
   * Triggered after the first tracking request, when the user ID is available.
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/events
   */
  onIdentityAvailable?: eventCallback<{
    userId: string,
    contextName: string,
    contextType: string,
    contextValue: string,
    groupSlug: string,
    journeyName: string
  }>;
  /**
   * Triggered when the user ID isnt available (ex: disabled cookies).
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/events
   */
  onIdentityUnknown?: eventCallback<any>;
  /**
   * Triggered on error while sending tracking event.
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/events
   */
  trackeError?: eventCallback<{ error: object }>;
}

declare interface AuditContextProps extends ComponentPropsWithoutRef<any> {
  /**
   * Your Poool App ID
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/installation
   */
  appId: string;
  /**
   * Your pool Audit configuration object
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/audit/configuration
   */
  config?: Poool.AuditConfigOptions;
  /**
   * Your pool Audit events
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/events
   */
  events?: AuditEvents;
  /**
   * The poool audit script url
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/installation
   */
  scriptUrl?: string;
}
/**
 * The Audit context is used to add Audit tracking to your app.
 *
 * Note that it can be replaced by the withAudit props
 * on the {@link AccessContext}
 * More infos: https://www.poool.dev/docs/access/javascript/audit/installation
 *
 */
declare function AuditContext(props: AuditContextProps): JSX.Element;

export default AuditContext;
