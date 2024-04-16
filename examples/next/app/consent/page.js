'use client';

import { useRef, useContext, useId } from 'react';
import { RestrictedContent, Paywall, Pixel } from '@poool/react-access';

import { PageContext } from '../../contexts';

const Consent = () => {
  const contentRef = useRef();
  const { setCookiesEnabled } = useContext(PageContext);
  const paywallId = useId();

  return (
    <div>
      <button
        id="consent-button"
        style={{ marginBottom: 100 }}
        onClick={setCookiesEnabled.bind(null, true)}
      >
        Give consent
      </button>
      <RestrictedContent ref={contentRef}>
        <div id="restricted-content">
          This sentence should be almost complete.
          This one should be entirely troncated, and if there&apos;s a rerender,
          the first one should not be touched again.
        </div>
      </RestrictedContent>
      <Paywall id={paywallId} contentRef={contentRef} />
      <Pixel reuse={true} type="page-view" data={{ type: 'premium' }} />
    </div>
  );
};

export default Consent;
