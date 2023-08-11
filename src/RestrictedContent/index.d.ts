import { ComponentPropsWithRef, ReactNode } from 'react';

declare interface RestrictedContentProps extends ComponentPropsWithRef<any> {
  /**
   * Way to hide content see
   * [Access configuration]
   * (https://www.poool.dev/docs/access/javascript/access/configuration#mode)
   * for more informations.
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/configuration
   */
  mode?: 'excerpt' | 'hide' | 'custom';
  /**
   * The restricted content children
   *
   * More infos: https://www.poool.dev/docs/access/react
   */
  children: ReactNode | JSX.Element;
  /**
   * The restriction percentage
   *
   * More infos:
   * https://www.poool.dev/docs/access/javascript/access/configuration
   */
  percent?: number;
}

/**
 * The RestrictedContent component
 *
 * Wrap your content inside our RestrictedContent component
 *
 * More infos: https://www.poool.dev/docs/access/react
 */
declare function RestrictedContent (props: RestrictedContentProps): JSX.Element;

export default RestrictedContent;
