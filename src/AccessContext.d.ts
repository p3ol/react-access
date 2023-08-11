import { Poool } from 'poool-access';
import React from 'react';

import { eventCallback } from '.';

export declare interface AccessEvents {
  /**
   * Triggered after the first tracking request, when the user ID is available.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
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
  /**
   * Triggered when the paywall locks the current article.
   */
  lock?: eventCallback<undefined>;
  /**
   * Triggered when the paywall is fully loaded and displayed inside the page.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  ready?: eventCallback<{
    widget: String,
    actionName: String,
    trigger: String,
    triggerType: String,
    triggerValue: String
  }>;
  /**
   * Triggered when the paywall has been seen by the user
   * (when it has entered the browser's viewport).
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  paywallSeen?: eventCallback<{
    widget: String,
    actionName: String,
    trigger: String,
    triggerType: String,
    triggerValue: String
  }>;
  /**
   * Triggered when the paywall unlocks the current article.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  release?: eventCallback<{
    widget: String,
    actionName: String,
    trigger: String,
    triggerType: String,
    triggerValue: String
  }>
  /**
   * Triggered when a user registers to your newsletter using
   * the newsletter widget or the pass widget.
   *
   * For example, thanks to this event, you'll be able
   * to save a user's email address using tools such as Mailchimp and Sendgrid.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  register?: eventCallback<{
    email: String,
    newsletterId: String,
    passId: String
  }>;
  /**
   * Triggered when a user has
   * clicked a subscribe button/link inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  subscribeClick?: eventCallback<{
    widget: String,
    actionName: String,
    button: String,
    originalEvent: MouseEvent,
    url: String
  }>;
  /**
   * Triggered when a user has clicked a signin button/link inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  loginClick?: eventCallback<{
    widget: String,
    actionName: String,
    button: String,
    originalEvent: MouseEvent,
    url: String
  }>;
  /**
   * Triggered when a user has clicked the Link Discovery widget's button
   * inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  discoveryLinkClick?: eventCallback<{
    widget: String,
    actionName: String,
    button: String,
    originalEvent: MouseEvent,
    url: String
  }>;
  /**
   * Triggered when a user has clicked the 'No thanks' link in the widget.
   * Initialy loaded action will be replaced by an alternative one,
   * set up in the dashboard in journey / actions configurations.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  alternativeClick?: eventCallback<{
    widget: String,
    actionName: String,
    button: String,
    originalEvent: MouseEvent,
  }>;
  /**
   * Triggered if an unknown/unexpected error
   * has appeared when loading the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  error?: (err, event?: {forceRelease?: () => any}) => any |
    {once: boolean, callback: (err, event?: {forceRelease?: () => any}) => any};
  /**
   * Triggered if the browser is detected
   * to be too old to run Poool's paywall correctly.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  outdatedBrowser: eventCallback<undefined>;
  /**
   * Triggered when a user has clicked a data information
   * button/link inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  dataPolicyClick?: eventCallback<{
    widget: String,
    actionName: String,
    button: String,
    originalEvent: MouseEvent,
    url: String
  }>;
  /**
   * Triggered when a user registers through a form using the Form widget.
   *
   * For example, thanks to this event, you'll be able to save a user's provided
   * informations using tools such as a DMP.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  formSubmit?: eventCallback<{
    name: String,
    fields: { [fieldKey: string]: any },
    valid: { [fieldKey: string]: Boolean}
  }>;
  /**
   * Triggered when a user clicks on Sign-in with Facebook inside the paywall,
   * enabled using `facebook_login_enabled` option.
   *
   * Use this event to place your calls to Facebook's login SDK.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  facebookLoginClick?: eventCallback<{
    widget: String,
    actionName: String,
    originalEvent: MouseEvent,
  }>;
  /**
   * Triggered when a user clicks on Sign-in with Google inside the paywall,
   * enabled using `google_login_enabled` option.
   *
   * Use this event to place your calls to Google's login SDK.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  googleLoginClick?: eventCallback<{
    widget: String,
    actionName: String,
    originalEvent: MouseEvent,
  }>;
  /**
   * Triggered after an answer is chosen in the question widget.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  answer?: eventCallback<{
    questionId: string;
    answer: string;
  }>;
  /**
   * Triggered after a click on the consent button.
   * It is then possible to set up your own consent logic.
   *
   * You can check our
   * [cookie-wall with Didomi](https://www.poool.dev/guides/cookie-wall)
   * guide for more information.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  consent?: eventCallback<any>;
  /**
   * Triggered after a click on a button component,
   * used in an advanced appearance or a form.
   *
   * Event Button
   * Arguments: { event: { name: String, buttonId: String } }
   *
   * Link Button
   * Arguments: { event: { url: String, buttonId: String } }
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  customButtonClick?: eventCallback<{
    name?: string;
    url?: string;
    buttonId: String;
  }>
}

declare interface AccessContextprops extends
React.ComponentPropsWithoutRef<any> {
  /**
   * Your poool app ID
   */
  appId: string;
  /**
   * Your config options
   *
   * more infos:
   * https://www.poool.dev/docs/access/javascript/access/configuration
   */
  config?: Poool.AccessConfigOptions;
  /**
   * Your texts options
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/texts
   */
  texts?: {[key: string]: string;};
  /**
   * Your access events
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/events
   */
  events?: AccessEvents;
  /**
   * Your access variables
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/variables
   */
  variables?: {
    [key: string]: any;
  };
  /**
   * The access Script Url
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  scriptUrl?: string;
  /**
   * Whether the access context should include audit or not
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  withAudit?: boolean;
}
/**
 * The Access context component
 *
 * Everything should be wrapped inside this component
 */
declare function AccessContext(props: AccessContextprops): JSX.Element;
export default AccessContext;
