import { eventCallback } from '.';

interface AuditEvents {
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
interface AuditConfig {
  debug?: boolean;
  cookies_enabled?: boolean;
  cookies_domain?: string;
  context?: string;
  custom_segment?: string;
  custom_reader_id?: string;
  user_is_premium?: boolean;
  ati_auto_tracking_enabled?: boolean;
  ati_tracking_method?: 'default' | 'events';
  piano_auto_tracking_enabled?: boolean;
  ga_auto_tracking_enabled?: boolean;
  gtm_auto_tracking_enabled?: boolean;
  gtag_auto_tracking_enabled?: boolean;
  auto_tracking_spec_v2?: boolean;
  ati_tag_options?: Object;
  beacons?: boolean;
  cookies_path?: string;
}
declare interface AuditContextProps
extends React.ComponentPropsWithoutRef<any> {
  appId: string;
  config?: AuditConfig;
  events?: AuditEvents;
  scriptUrl?: string;
}

declare function AuditContext(props: AuditContextProps): JSX.Element;
export default AuditContext;
