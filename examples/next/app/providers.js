'use client';

import { useCallback, useState } from 'react';
import { AccessContext } from '@poool/react-access';
import PropTypes from 'prop-types';

import { PageContext } from '../contexts';

const Providers = ({ children }) => {
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

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
