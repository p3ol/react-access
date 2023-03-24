import { Poool } from '@types/poool-access';

import { eventCallback } from '.';

export declare interface AuditEvents {
  onIdentityAvailable?: eventCallback<{
    userId: string,
    contextName: String,
    contextType: String,
    contextValue: String,
    groupSlug: String,
    journeyName: String
  }>;
  onIdentityUnknown?: eventCallback<any>;
  trackeError?: eventCallback<{error: Object}>;
}

declare interface AuditContextProps
extends React.ComponentPropsWithoutRef<any> {
  appId: string;
  config?: Poool.AuditConfigOptions;
  events?: AuditEvents;
  scriptUrl?: string;
}

declare function AuditContext(props: AuditContextProps): JSX.Element;
export default AuditContext;
