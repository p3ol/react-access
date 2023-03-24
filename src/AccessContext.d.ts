import { Poool } from 'poool-access';
import React from 'react';

import { eventCallback } from '.';

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
  config?: Poool.AccessConfigOptions;
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
