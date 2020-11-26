import React, { createRef } from 'react';
import { render, waitFor } from '@testing-library/react';

import { PaywallContext, usePoool } from '../src';

describe('<PaywallContext />', () => {
  let ref;
  beforeAll(() => {
    ref = global.poool;
    global.poool = null;
  });

  it('should render children', async () => {
    const { container, unmount } = render(
      <PaywallContext><div className="test" /></PaywallContext>
    );

    await waitFor(() => {
      expect(container.querySelectorAll('.test').length).toBe(1);
    });

    unmount();
  });

  it('should not reload the library twice', async () => {
    const ref_ = createRef();

    const TestComponent = () => {
      const { poool } = usePoool();
      ref_.current = poool;

      return null;
    };

    const { rerender, unmount } = render(
      <PaywallContext><TestComponent /></PaywallContext>
    );

    await waitFor(() => {
      expect(ref_.current).toBeTruthy();
    });

    const witness = ref_.current;

    rerender(<PaywallContext appId="test"><TestComponent /></PaywallContext>);

    await waitFor(() => {
      expect(ref_.current).toBe(witness);
    });

    unmount();
  });

  afterAll(() => {
    global.poool = ref;
  });

});
