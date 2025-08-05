import type { Poool } from 'poool-access';

export declare type EventCallbackFunction<Props> = (props: Props) => any;
export declare interface EventCallbackObject<Props> {
  once: true;
  callback: EventCallbackFunction<Props>;
}

export declare type EventCallback<Props> =
  | EventCallbackFunction<Props>
  | EventCallbackObject<Props>;

export declare type BaseEvents = Partial<Record<Poool.EventsList, any>>;

export declare interface AccessIdentityAvailableEvent {
  userId: string;
  contextName: string;
  contextType: string;
  contextValue: string;
  groupSlug: string;
  scenarioName: string;
  widget: string;
  actionName: string;
  trigger: string;
  triggerType: string;
  triggerValue: string;
}

export declare interface AccessReadyEvent {
  widget: string;
  actionName: string;
  trigger: string;
  triggerType: string;
  triggerValue: string;
}

export declare interface AccessPaywallSeenEvent {
  widget: string;
  actionName: string;
  trigger: string;
  triggerType: string;
  triggerValue: string;
}

export declare interface AccessReleaseEvent {
  widget: string;
  actionName: string;
  trigger: string;
  triggerType: string;
  triggerValue: string;
}

export declare interface AccessRegisterEvent {
  email: string;
  newsletterId: string;
  passId: string;
}

export declare interface AccessSubscribeClickEvent {
  widget: string;
  actionName: string;
  button: string;
  originalEvent: MouseEvent;
  url: string;
}

export declare interface AccessLoginClickEvent {
  widget: string;
  actionName: string;
  button: string;
  originalEvent: MouseEvent;
  url: string;
}

export declare interface AccessDiscoveryLinkClickEvent {
  widget: string;
  actionName: string;
  button: string;
  originalEvent: MouseEvent;
  url: string;
}

export declare interface AccessAlternativeClickEvent {
  widget: string;
  actionName: string;
  button: string;
  originalEvent: MouseEvent;
}

export declare interface AccessDataPolicyClickEvent {
  widget: string;
  actionName: string;
  button: string;
  originalEvent: MouseEvent;
  url: string;
}

export declare interface AccessFormSubmitEvent {
  name: string;
  fields: Record<string, any>;
  valid: Record<string, boolean>;
}

export declare interface AccessFacebookLoginClickEvent {
  widget: string;
  actionName: string;
  originalEvent: MouseEvent;
}

export declare interface AccessGoogleLoginClickEvent {
  widget: string;
  actionName: string;
  originalEvent: MouseEvent;
}

export declare interface AccessAnswerEvent {
  questionId: string;
  answer: string;
}

export declare interface AccessCustomButtonClickEvent {
  name?: string;
  url?: string;
  buttonId: string;
}

export declare interface AccessEvents extends BaseEvents {
  /**
   * Triggered after the first tracking request, when the user ID is available.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  identityAvailable: EventCallback<AccessIdentityAvailableEvent>;
  /**
   * Triggered when the paywall locks the current article.
   */
  lock: EventCallback<undefined>;
  /**
   * Triggered when the paywall is fully loaded and displayed inside the page.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  ready: EventCallback<AccessReadyEvent>;
  /**
   * Triggered when the paywall has been seen by the user
   * (when it has entered the browser's viewport).
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  paywallSeen: EventCallback<AccessPaywallSeenEvent>;
  /**
   * Triggered when the paywall unlocks the current article.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  release: EventCallback<AccessReleaseEvent>
  /**
   * Triggered when a user registers to your newsletter using
   * the newsletter widget or the pass widget.
   *
   * For example, thanks to this event, you'll be able
   * to save a user's email address using tools such as Mailchimp and Sendgrid.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  register: EventCallback<AccessRegisterEvent>;
  /**
   * Triggered when a user has
   * clicked a subscribe button/link inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  subscribeClick: EventCallback<AccessSubscribeClickEvent>;
  /**
   * Triggered when a user has clicked a signin button/link inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  loginClick: EventCallback<AccessLoginClickEvent>;
  /**
   * Triggered when a user has clicked the Link Discovery widget's button
   * inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  discoveryLinkClick: EventCallback<AccessDiscoveryLinkClickEvent>;
  /**
   * Triggered when a user has clicked the 'No thanks' link in the widget.
   * Initialy loaded action will be replaced by an alternative one,
   * set up in the dashboard in journey / actions configurations.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  alternativeClick: EventCallback<AccessAlternativeClickEvent>;
  /**
   * Triggered if an unknown/unexpected error
   * has appeared when loading the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  error: ((err: Error, event?: { forceRelease?: () => void }) => any) |
    { once: boolean, callback: (err: Error, event?: {
      forceRelease?: () => any;
    }) => any };
  /**
   * Triggered if the browser is detected
   * to be too old to run Poool's paywall correctly.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  outdatedBrowser: EventCallback<undefined>;
  /**
   * Triggered when a user has clicked a data information
   * button/link inside the paywall.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  dataPolicyClick: EventCallback<AccessDataPolicyClickEvent>;
  /**
   * Triggered when a user registers through a form using the Form widget.
   *
   * For example, thanks to this event, you'll be able to save a user's provided
   * informations using tools such as a DMP.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  formSubmit: EventCallback<AccessFormSubmitEvent>;
  /**
   * Triggered when a user clicks on Sign-in with Facebook inside the paywall,
   * enabled using `facebook_login_enabled` option.
   *
   * Use this event to place your calls to Facebook's login SDK.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  facebookLoginClick: EventCallback<AccessFacebookLoginClickEvent>;
  /**
   * Triggered when a user clicks on Sign-in with Google inside the paywall,
   * enabled using `google_login_enabled` option.
   *
   * Use this event to place your calls to Google's login SDK.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  googleLoginClick: EventCallback<AccessGoogleLoginClickEvent>;
  /**
   * Triggered after an answer is chosen in the question widget.
   *
   * more infos:https://www.poool.dev/docs/access/javascript/access/events
   */
  answer: EventCallback<AccessAnswerEvent>;
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
  consent: EventCallback<undefined>;
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
  customButtonClick: EventCallback<AccessCustomButtonClickEvent>;
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
  identityAvailable: EventCallback<AuditIdentityAvailableEvent>;
  /**
   * Triggered when the user ID isnt available (ex: disabled cookies).
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/events
   */
  identityUnknown: EventCallback<undefined>;
  /**
   * Triggered on error while sending tracking event.
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/events
   */
  trackError: EventCallback<AuditTrackErrorEvent>;
}
