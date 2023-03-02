import { AuditConfig } from './AuditContext';

declare interface PixelProps extends React.ComponentPropsWithoutRef<any> {
  type: 'page-view';
  data?: {
    type: 'premium' | 'free' | 'page'
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
