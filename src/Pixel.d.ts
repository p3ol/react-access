import { Poool } from 'poool-access';

declare interface PixelProps extends React.ComponentPropsWithoutRef<any> {
  /**
   * The event type
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/methods
   */
  type: 'page-view';
  /**
   * The event data
   *
   * More infos: https://www.poool.dev/docs/access/javascript/audit/methods
   */
  data?: {
    type?: 'premium' | 'free' | 'page',
    [key: string]: any
  }
  /**
   * The audit config options
   *
   * More infos: https://www.poool.dev/docs/audit/javascript/audit/configuration
   */
  config?: Poool.AuditConfigOptions;
  /**
   * the event options
   *
   * more infos: https://www.poool.dev/docs/access/javascript/audit/methods
   */
  options?: {
    beacons?: boolean,
    [key: string]: any
  };
  /**
   * Callback to execute when the event is done
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  onDone?: () => any;
  /**
   * Whether to reuse the same event or not
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  reuse?: Boolean
}
/**
 * Place our ` component anywhere inside an <AuditContext /> component (or
 * `<AccessContext withAudit={true} />`) to track page-view events
 * (used for native segmentation)
 *
 * More infos: https://www.poool.dev/docs/access/react
 */
declare function Pixel (props: PixelProps): JSX.Element;
export default Pixel;
