import type { Poool } from 'poool-access';
import type { ForwardedProps } from '@junipero/react';
import {
  type ComponentPropsWithoutRef,
  type MutableRefObject,
  type ReactElement,
  Children,
  cloneElement,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';

export declare interface RestrictedContentProps extends Pick<
  Poool.AccessConfigOptions,
  'mode' | 'percent'
>, ComponentPropsWithoutRef<any> {}

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
}) as ForwardedProps<RestrictedContentRef, RestrictedContentProps>;

RestrictedContent.displayName = 'RestrictedContent';

export default RestrictedContent;
