import { AuditConfig } from './AuditContext';

declare interface PixelProps extends React.ComponentPropsWithoutRef<any> {
  type: 'page-view' | 'conversion';
  data?: {
    type: 'premium' | 'free' | 'page' | 'subscription'
  }
  config?: AuditConfig;
  options?: {
    beacons?: boolean
  };
  onDone?: () => any;
  reuse?: Boolean
}

declare function Pixel (props: PixelProps): JSX.Element;
export default Pixel;
