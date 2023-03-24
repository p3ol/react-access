import { Poool } from 'poool-access';
import React, { MutableRefObject } from 'react';

import { AccessEvents } from './AccessContext';

declare interface PaywallProps extends React.ComponentPropsWithRef<any> {
  contentRef: MutableRefObject<any>,
  id?: String;
  events?: AccessEvents;
  children?: React.ReactNode;
  config?: Poool.AccessConfigOptions,
  texts?: {[key: string]: string};
  styles?: Poool.styles,
  variables?: {[key: string]: any},
  pageType?: 'premium' | 'free' | 'page' | 'subscription' | 'registration'
}

declare function Paywall(props: PaywallProps): JSX.Element
export default Paywall;
