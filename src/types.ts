import type { ForwardedRef } from 'react';
import type { Poool } from 'poool-access';

import type { PaywallRef } from './Paywall';

export declare type EventCallback<E = any, R = any> = (
  event: E,
  paywallRef: ForwardedRef<PaywallRef>,
) => R;

export declare type BaseEvents = {
  [key in Poool.EventsList]?: any
};

export declare interface AccessEvents extends BaseEvents {
  /**
   * Triggered after the first tracking request, when the user ID is available.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  identityAvailable?: {
    userId: string;
    groupSlug: string;
    scenarioName: string;
    widget: string;
    actionName: string;
    contextName?: string;
    contextType?: string;
    contextValue?: string;
    trigger?: string;
    triggerType?: string;
    triggerValue?: string;
  };
  /**
   * Triggered when the paywall locks the current article.
   */
  lock?: undefined;
  /**
   * Triggered when the paywall is fully loaded and displayed inside the page.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  ready?: {
    widget: string;
    actionName: string;
    trigger?: string;
    triggerType?: string;
    triggerValue?: string;
  };
  /**
   * Triggered when the paywall has been seen by the user
   * (when it has entered the browser's viewport).
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  paywallSeen?: {
    widget: string;
    actionName: string;
    trigger?: string;
    triggerType?: string;
    triggerValue?: string;
  };
  /**
   * Triggered when the paywall unlocks the current article.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  release?: {
    widget: string;
    actionName: string;
    trigger?: string;
    triggerType?: string;
    triggerValue?: string;
  };
  /**
   * Triggered when a user registers to your newsletter using
   * the newsletter widget or the pass widget.
   *
   * For example, thanks to this event, you'll be able
   * to save a user's email address using tools such as Mailchimp and Sendgrid.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  register?: {
    email: string;
    newsletterId: string;
    passId: string;
  };
  /**
   * Triggered when a user has
   * clicked a subscribe button/link inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  subscribeClick?: {
    widget: string;
    actionName: string;
    button: string;
    url: string;
  };
  /**
   * Triggered when a user has clicked a signin button/link inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  loginClick?: {
    widget: string;
    actionName: string;
    button: string;
    url: string;
  };
  /**
   * Triggered when a user has clicked the Link Discovery widget's button
   * inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  discoveryLinkClick?: {
    widget: string;
    actionName: string;
    button: string;
    url: string;
  };
  /**
   * Triggered when a user has clicked the 'No thanks' link in the widget.
   * Initialy loaded action will be replaced by an alternative one,
   * set up in the dashboard in journey / actions configurations.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  alternativeClick?: {
    widget: string;
    actionName: string;
    button: string;
  };
  /**
   * Triggered if an unknown/unexpected error
   * has appeared when loading the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  error?: {
    error: Error;
    forceRelease(): Promise<void>;
  };
  /**
   * Triggered when a user has clicked a data information
   * button/link inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  dataPolicyClick?: {
    widget: string;
    actionName: string;
    button: string;
    url: string;
  };
  /**
   * Triggered when a user registers through a form using the Form widget.
   *
   * For example, thanks to this event, you'll be able to save a user's provided
   * informations using tools such as a DMP.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  formSubmit?: {
    name: string;
    fields: { [fieldKey: string]: any };
    valid: { [fieldKey: string]: boolean};
  };
  /**
   * Triggered when a user clicks on Sign-in with Facebook inside the paywall,
   * enabled using `facebook_login_enabled` option.
   *
   * Use this event to place your calls to Facebook's login SDK.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  facebookLoginClick?: {
    widget: string;
    actionName: string;
  };
  /**
   * Triggered when a user clicks on Sign-in with Google inside the paywall,
   * enabled using `google_login_enabled` option.
   *
   * Use this event to place your calls to Google's login SDK.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  googleLoginClick?: {
    widget: string;
    actionName: string;
  };
  /**
   * Triggered after an answer is chosen in the question widget.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  answer?: {
    questionId: string;
    answer: string;
  };
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
  consent?: undefined;
  /**
   * Triggered after a click on a button component,
   * used in an advanced appearance or a form.
   *
   * Event Button
   * Arguments: { event: { name: string, buttonId: string } }
   *
   * Link Button
   * Arguments: { event: { url: string, buttonId: string } }
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  customButtonClick?: {
    name?: string;
    url?: string;
    buttonId: string;
  };

  // internal
  resize?: {
    width: number;
    height: number;
  };
}

export declare interface AuditIdentityAvailableEvent {
  userId: string;
  contextName: string;
  contextType: string;
  contextValue: string;
  groupSlug: string;
  journeyName: string;
}

export declare interface AuditTrackErrorEvent {
  error: Error;
}

export declare interface AuditEvents extends BaseEvents {
  /**
   * Triggered after the first tracking request, when the user ID is available.
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/events
   */
  identityAvailable?: {
    userId: string;
    contextName: string;
    contextType: string;
    contextValue: string;
    groupSlug: string;
    journeyName: string;
  }
  /**
   * Triggered when the user ID isnt available (ex: disabled cookies).
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/events
   */
  identityUnknown?: {};
  /**
   * Triggered on error while sending tracking event.
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/events
   */
  trackError?: {
    error: Error;
  }
}
