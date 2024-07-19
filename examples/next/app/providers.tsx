'use client';

import { type ComponentPropsWithoutRef, useCallback, useState } from 'react';
import { AccessContext } from '@poool/react-access';

import { PageContext } from '../contexts';

const Providers = ({ children }: ComponentPropsWithoutRef<any>) => {
  const [cookiesEnabled, setCookiesEnabled] = useState(false);

  const getContext = useCallback(() => ({
    cookiesEnabled,
    setCookiesEnabled,
  }), [cookiesEnabled, setCookiesEnabled]);

  return (
    <PageContext.Provider value={getContext()}>
      <AccessContext
        appId="155PF-L7Q6Q-EB2GG-04TF8"
        config={{
          cookies_enabled: cookiesEnabled,
          debug: true,
          custom_segment: 'react',
          cookies_domain: 'localhost',
          audit_load_timeout: 30000,
        }}
        styles={{}}
        texts={{}}
        withAudit={true}
      >
        { children }
      </AccessContext>
    </PageContext.Provider>
  );
};

export default Providers;
