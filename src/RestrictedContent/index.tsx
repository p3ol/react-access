import type { Poool } from 'poool-access';
import {
  type ComponentPropsWithoutRef,
  type MutableRefObject,
  type ReactNode,
  Children,
  cloneElement,
  forwardRef,
  useRef,
  useImperativeHandle,
  ReactElement,
} from 'react';

export declare interface RestrictedContentProps
  extends ComponentPropsWithoutRef<any> {
  /**
   * Way to hide content see
   * [Access configuration]
   * (https://www.poool.dev/docs/access/javascript/access/configuration#mode)
   * for more informations.
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/configuration
   */
  mode?: Poool.AccessConfigOptions['mode'];
  /**
   * The restricted content children
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  children: ReactNode;
  /**
   * The restriction percentage
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/configuration
   */
  percent?: Poool.AccessConfigOptions['percent'];
}

export declare interface RestrictedContentRef {
  contentRef: MutableRefObject<HTMLElement>;
  mode: RestrictedContentProps['mode'];
  percent: RestrictedContentProps['percent'];
}

const RestrictedContent = forwardRef<
  RestrictedContentRef,
  RestrictedContentProps
>(({
  mode,
  percent,
  children,
}, ref) => {
  const contentRef = useRef<HTMLElement>();

  useImperativeHandle(ref, () => ({
    contentRef,
    mode,
    percent,
  }));

  return cloneElement(Children.only(children as ReactElement), {
    ref: contentRef,
  });
});

RestrictedContent.displayName = 'RestrictedContent';

export default RestrictedContent;
