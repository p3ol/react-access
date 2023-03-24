import { Poool } from 'poool-access';

import { AccessEvents } from './AccessContext';
import { AuditEvents } from './AuditContext';

export declare function useAccess(): {
  appId: String,
  config: Poool.AccessConfigOptions,
  texts: {[key: string]: string}
  styles: Poool.styles,
  events: AccessEvents,
  variables: {[key: string]: any},
  scriptUrl: string,
  lib: any,
  createFactory: () => any;
  destroyFactory: () => any;
};

export declare function useAudit(): {
  appId: String,
  config: Poool.AuditConfigOptions,
  events: AuditEvents,
  scriptUrl: string,
  lib: any
};
