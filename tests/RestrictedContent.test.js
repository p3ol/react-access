import React, { useContext, forwardRef } from 'react';
import { render, waitFor } from '@testing-library/react';

import { DefaultContext } from '../src/contexts';
import { RestrictedContent } from '../src';
import PaywallContext from '../src/PaywallContext';

describe('<RestrictedContent />', () => {

  it('should render children', () => {
    const { container } = render(
      <RestrictedContent><div className="test" /></RestrictedContent>
    );
    expect(container.querySelectorAll('.test').length).toBe(1);
  });

  it('should set content element ref inside context on mount', async () => {
    const Child = forwardRef((props, ref) => {
      const { container } = useContext(DefaultContext);
      return <div ref={ref} id="context-container-test">{ container }</div>;
    });

    const { getByText, unmount } = render(
      <PaywallContext>
        <RestrictedContent><Child /></RestrictedContent>
      </PaywallContext>
    );

    await waitFor(() => {
      expect(getByText('context-container-test')).toBeTruthy();
    });

    unmount();
  });

});
