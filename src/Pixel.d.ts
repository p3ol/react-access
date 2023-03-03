import { AuditConfig } from './AuditContext';

declare interface PixelProps extends React.ComponentPropsWithoutRef<any> {
  type: 'page-view';
  data?: {
    type?: 'premium' | 'free' | 'page',
    [key: string]: any
  }
  config?: AuditConfig;
  options?: {
    beacons?: boolean,
    [key: string]: any
  };
  onDone?: () => any;
  reuse?: Boolean
}

declare function Pixel (props: PixelProps): JSX.Element;
export default Pixel;
