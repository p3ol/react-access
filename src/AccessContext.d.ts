import React from 'react';

import { eventCallback } from '.';

export declare interface AccessConfig {
  debug?: boolean;
  mode?: 'hide' | 'excerpt' | 'custom';
  percent?: number;
  post_container?: string;
  widget_container?: string;
  app_name?: string;
  force_widget?: 'auto'
    | 'hidden'
    | 'disabled'
    | 'none'
    | 'video'
    | 'newsletter'
    | 'subscription'
    | 'gift'
    | 'question'
    | 'unlock'
    | 'link'
    | 'pass'
    | 'unlock'
    | 'invisible';
  subscription_url?: string;
  subscription_button_enabled?: boolean;
  newsletter_name?: string;
  newsletter_id?: string;
  login_url?: string;
  login_button_enabled?: boolean;
  signature_enabled?: boolean;
  user_is_premium?: boolean;
  video_client?: 'vast' | 'googima';
  popover_enabled?: boolean;
  alternative_enabled?: boolean;
  alternative_widget?: 'none'
    | 'video'
    | 'gift'
    | 'question'
    | 'subscription'
    | 'newsletter';
  vast?: string;
  mobile_vast?: string;
  context?: string;
  custom_segment?: string;
  cookies_enabled?: boolean;
  consent_rejection_widget?: 'invisible'
    | 'unlock'
    | 'gift'
    | 'subscription';
  data_policy_url?: string;
  locale?: 'fr' | 'en';
  popover_timeout?: number;
  disable_content_height_calculation?: boolean;
  wait_for_dom_load?: boolean;
  paywall_load_timeout?: number;
  track_original_action?: boolean;
  components_load_timeout?: number;
  ati_tracking_enabled?: boolean;
  ati_load_timeout?: number;
  facebook_login_enabled?: boolean;
  google_login_enabled?: boolean;
  ati_auto_tracking_enabled?: boolean;
  ati_tracking_method?: 'default' | 'events';
  piano_auto_tracking_enabled?: boolean;
  ga_auto_tracking_enabled?: boolean;
  gtm_auto_tracking_enabled?: boolean;
  gtag_auto_tracking_enabled?: boolean;
  auto_tracking_spec_v2?: boolean;
  ati_tag_options?: Object;
  custom_reader_id?: string;
  stripe_public_key?: string;
  popover_auto_hide?: boolean;
  custom_return_url?: string;
  cookies_domain?: string;
  default_widget?:'invisible' | 'unlock' | 'gift' | 'subscription';
  fallback_widget?: string;
  audit_load_timeout?: number;
  beacons?: boolean;
  cookies_path?: string;
}

export declare interface AccessEvents {
  identityAvailable?: eventCallback<{
    userId: String,
    contextName: String
     contextType: String,
     contextValue: String,
     groupSlug: String,
     scenarioName: String,
     widget: String,
     actionName: String,
     trigger: String,
     triggerType: String,
     triggerValue: String
  }>;
  lock?: eventCallback<undefined>;
  ready?: eventCallback<{
    widget: String,
    actionName: String,
    trigger: String,
    triggerType: String,
    triggerValue: String
  }>;
  paywallSeen?: eventCallback<{
    widget: String,
    actionName: String,
    trigger: String,
    triggerType: String,
    triggerValue: String
  }>;
  release?: eventCallback<{
    widget: String,
    actionName: String,
    trigger: String,
    triggerType: String,
    triggerValue: String
  }>
  register?: eventCallback<{
    email: String,
    newsletterId: String,
    passId: String
  }>;
  subscribeClick?: eventCallback<{
    widget: String,
    actionName: String,
    button: String,
    originalEvent: MouseEvent,
    url: String
  }>;
  loginClick?: eventCallback<{
    widget: String,
    actionName: String,
    button: String,
    originalEvent: MouseEvent,
    url: String
  }>;
  discoveryLinkClick?: eventCallback<{
    widget: String,
    actionName: String,
    button: String,
    originalEvent: MouseEvent,
    url: String
  }>;
  alternativeClick?: eventCallback<{
    widget: String,
    actionName: String,
    button: String,
    originalEvent: MouseEvent,
  }>;
  error?: (err, event?: {forceRelease?: () => any}) => any |
    {once: boolean, callback: (err, event?: {forceRelease?: () => any}) => any};
  dataPolicyClick?: eventCallback<{
    widget: String,
    actionName: String,
    button: String,
    originalEvent: MouseEvent,
    url: String
  }>;
  formSubmit?: eventCallback<{
    name: String,
    fields: { [fieldKey: string]: any },
    valid: { [fieldKey: string]: Boolean}
  }>;
  facebookLoginClick?: eventCallback<{
    widget: String,
    actionName: String,
    originalEvent: MouseEvent,
  }>;
  googleLoginClick?: eventCallback<{
    widget: String,
    actionName: String,
    originalEvent: MouseEvent,
  }>;
  answer?: eventCallback<{
    questionId: string;
    answer: string;
  }>;
  consent?: eventCallback<any>;
  customButtonClick?: eventCallback<{
    name?: string;
    url?: string;
    buttonId: String;
  }>
}

declare interface AccessContextprops extends
React.ComponentPropsWithoutRef<any> {
  appId: string;
  config?: AccessConfig;
  texts?: {[key: string]: string;};
  events?: AccessEvents;
  variables?: {
    [key: string]: any;
  };
  scriptUrl?: string;
  withAudit?: boolean;
}

declare function AccessContext(props: AccessContextprops): JSX.Element;
export default AccessContext;
