import React, { MutableRefObject } from 'react';

import { AccessConfig, AccessEvents } from './AccessContext';

export declare interface styles {
  layout: 'portrait' | 'landscape';
  brand_logo?: string;
  brand_cover?: string;
  button_color?: string;
  button_hover_color?: string;
  skin_color?: string;
  premium_color?: string;
  custom_css?: string;
}
declare interface PaywallProps extends React.ComponentPropsWithRef<any> {
  contentRef: MutableRefObject<any>,
  id?: String;
  events?: AccessEvents;
  children?: React.ReactNode;
  config?: AccessConfig,
  texts?: {[key: string]: string};
  styles?: styles,
  variables?: {[key: string]: any},
  pageType?: 'premium' | 'free' | 'page' | 'subscription' | 'registration'
}

declare function Paywall(props: PaywallProps): JSX.Element
export default Paywall;
