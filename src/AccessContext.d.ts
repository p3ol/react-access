import React from 'react';

declare interface AccessContextprops extends
React.ComponentPropsWithoutRef<any> {
  appId: string;
  config?: Object;
  texts?: Object;
  events?: Object;
  variables?: Object;
  scriptUrl?: string;
  withAudit?: boolean;
}

declare function AccessContext(props: AccessContextprops): JSX.Element;
export default AccessContext;
