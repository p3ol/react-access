import type { Poool } from 'poool-access';
import {
  type ComponentPropsWithoutRef,
  type RefObject,
  Children,
  cloneElement,
  useRef,
  useImperativeHandle,
} from 'react';

export declare interface RestrictedContentRef {
  contentRef: RefObject<HTMLElement>;
  mode: Poool.AccessConfigOptions['mode'];
  percent: Poool.AccessConfigOptions['percent'];
}

export declare interface RestrictedContentProps extends Pick<
  Poool.AccessConfigOptions,
  'mode' | 'percent'
>, ComponentPropsWithoutRef<any> {
  ref?: RefObject<RestrictedContentRef>;
}

const RestrictedContent = ({
  ref,
  mode,
  percent,
  children,
}: RestrictedContentProps) => {
  const contentRef = useRef<HTMLDivElement>(undefined);

  useImperativeHandle(ref, () => ({
    contentRef,
    mode,
    percent,
  }));

  return cloneElement(Children.only(children), {
    ref: contentRef,
  });
};

RestrictedContent.displayName = 'RestrictedContent';

export default RestrictedContent;
