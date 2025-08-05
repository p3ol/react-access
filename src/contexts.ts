import type { Poool } from 'poool-access';
import { createContext } from 'react';

import type { AccessEvents, AuditEvents } from './types';

export interface AccessContextValue {
  /**
   * Your poool app ID
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  appId?: string;
  /**
   * Your poool access config options
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/configuration
   */
  config?: Omit<Poool.AccessConfigOptions, 'widget_container'>;
  /**
   * Your poool access texts ati_tag_options
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/texts
   */
  texts?: Record<string, string>;
  /**
   * Your poool access styles
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/styles
   */
  styles?: Poool.styles;
  /**
   * Your poool access events
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/events
   */
  events?: { [key in Poool.EventsList]?: AccessEvents[key] };
  /**
   * Your pool access variables
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/variables
   */
  variables?: Record<string, any>;
  /**
   * The poool access script url
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  scriptUrl?: string;
  /**
   * The poool access sdk
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  lib?: Poool.Access;
  /**
   * Function to trigger a new access init, returns the created access instance,
   * with passed options
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  createFactory?: (
    opts?: Pick<
      AccessContextValue,
      'config' | 'texts' | 'styles' | 'variables' | 'events'
    >
  ) => Poool.AccessFactory;
  /**
   * Function to delete a factory
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  destroyFactory?: (factory: Poool.AccessFactory) => Promise<void>;
}

export const AccessContext = createContext<AccessContextValue>({});

export interface AuditContextValue {
  /**
   * Your Poool App ID
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/installation
   */
  appId?: string;
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
  events?: { [key in Poool.EventsList]: AuditEvents[key] };
  /**
   * The poool audit script url
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/installation
   */
  scriptUrl?: string;
  /**
   * The poool audit sdk
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  lib?: Poool.Audit;
}

export const AuditContext = createContext<AuditContextValue>({});
