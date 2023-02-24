import { MutableRefObject } from "react";

declare interface PaywallProps extends React.ComponentPropsWithRef<any> {
  contentRef: MutableRefObject<any>,
  id?: String;
  events?: Object;
  children?: React.ReactNode;
  config?: Object,
  texts?: Object;
  styles?: Object,
  variables?: Object,
  pageType?: 'premium' | 'free' | 'page' | 'subscription' | 'registration'
};

declare function Paywall(props: PaywallProps): JSX.Element;
export default Paywall;