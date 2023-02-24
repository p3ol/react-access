declare interface AuditContextProps extends React.ComponentPropsWithoutRef<any> {
  appId: string;
  config?: Object;
  events?: Object;
  scriptUrl?: string;
}

declare function AuditContext(props: AuditContextProps): JSX.Element;
export default AuditContext;
