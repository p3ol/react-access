import { Poool } from 'poool-access';
import React, { MutableRefObject } from 'react';

import { AccessEvents } from './AccessContext';

declare interface PaywallProps extends React.ComponentPropsWithRef<any> {
  /**
   * Ref to the content
   */
  contentRef: MutableRefObject<any>,
  /**
   * Custom wrapper component ID
   */
  id?: string;
  /**
   * The paywall events
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/events
   */
  events?: AccessEvents;
  /**
   * The paywall children
   */
  children?: React.ReactNode;
  /**
   * The paywall config options
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/configuration
   */
  config?: Poool.AccessConfigOptions,
  /**
   * The paywall texts options
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/texts
   */
  texts?: {[key: string]: string};
  /**
   * The paywall styles
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/styles
   */
  styles?: Poool.styles,
  /**
   * The paywall variables
   *
   * More infos: https://www.poool.dev/docs/access/javascript/access/variables
   */
  variables?: {[key: string]: any},
  /**
   * The current page type
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/installation
   */
  pageType?: 'premium' | 'free' | 'page' | 'subscription' | 'registration'
}
/**
 * The Paywall component
 *
 * Place our `<Paywall />` component where you want your paywall to be displayed
 */
declare function Paywall(props: PaywallProps): JSX.Element
export default Paywall;
