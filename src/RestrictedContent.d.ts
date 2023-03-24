declare interface RestrictedContentProps
extends React.ComponentPropsWithRef<any> {
  mode?: 'excerpt' | 'hide' | 'custom';
  children: React.ReactNode | JSX.Element;
  percent?: number;
}
declare function RestrictedContent (props: RestrictedContentProps): JSX.Element;

export default RestrictedContent;
