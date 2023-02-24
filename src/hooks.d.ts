import { AccessConfig, AccessEvents } from './AccessContext';
import { AuditConfig, AuditEvents } from './AuditContext';
import { styles } from './Paywall';

export declare function useAccess(): {
  appId: String,
  config: AccessConfig,
  texts: {[key: string]: string}
  styles: styles,
  events: AccessEvents,
  variables: {[key: string]: any},
  scriptUrl: string,
  lib: any,
  createFactory: () => any;
  destroyFactory: () => any;
};

export declare function useAudit(): {
  appId: String,
  config: AuditConfig,
  events: AuditEvents,
  scriptUrl: string,
  lib: any
};
