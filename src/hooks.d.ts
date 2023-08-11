import { Poool } from 'poool-access';

import { AccessEvents } from './AccessContext';
import { AuditEvents } from './AuditContext';
/**
 * Can be used to retrieve some properties from the current access context,
 * as well as the Access SDK itself.
 */
export declare function useAccess(): {
  /**
   * Your poool app ID
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  appId: string,
  /**
   * Your poool access config options
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/configuration
   */
  config: Poool.AccessConfigOptions,
  /**
   * Your poool access texts ati_tag_options
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/texts
   */
  texts: { [key: string]: string }
  /**
   * Your poool access styles
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/styles
   */
  styles: Poool.styles,
  /**
   * Your poool access events
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/events
   */
  events: AccessEvents,
  /**
   * Your pool access variables
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/variables
   */
  variables: { [key: string]: any },
  /**
   * The poool access script url
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  scriptUrl: string,
  /**
   * The poool access sdk
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  lib: any,
  /**
   * Function to trigger a new access init, returns the created access instance,
   * with passed options
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  createFactory: () => any;
  /**
   * Function to delete a factory
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  destroyFactory: () => any;
};

export declare function useAudit(): {
  /**
   * Your poool app ID
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/installation
   */
  appId: string,
  /**
   * Your poool audit config options
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/audit/configuration
   */
  config: Poool.AuditConfigOptions,
  /**
   * Your poool audit events
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/audit/configuration
   */
  events: AuditEvents,
  /**
   * The poool audit script url
   *
   * More infos:  https://www.poool.dev/docs/access/javascript/audit/events
   */
  scriptUrl: string,
  /**
   * The poool audit sdk
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  lib: any
};
