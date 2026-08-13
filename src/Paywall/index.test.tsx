import type { RefObject } from 'react';
import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { withAccess } from '~/tests/utils';

import type { RestrictedContentRef } from '../RestrictedContent';
import Paywall from './index';

describe('<Paywall />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create paywall at start', () => {
    const createPaywallMock = vi.fn();
    const createFactoryMock = vi.fn().mockReturnValue({
      createPaywall: createPaywallMock,
      once: vi.fn(),
      off: vi.fn(),
    });

    render(withAccess(<Paywall />, {
      createFactory: createFactoryMock,
    }));

    expect(createFactoryMock).toHaveBeenCalled();
    expect(createPaywallMock).toHaveBeenCalled();
  });

  it('should set listener on identityAvailable event', () => {
    const onceMock = vi.fn();
    const createFactoryMock = vi.fn().mockReturnValue({
      createPaywall: vi.fn(),
      once: onceMock,
      off: vi.fn(),
    });

    render(withAccess(<Paywall />, {
      createFactory: createFactoryMock,
    }));

    expect(createFactoryMock).toHaveBeenCalled();
    expect(onceMock)
      .toHaveBeenCalledWith('identityAvailable', expect.any(Function));
  });

  it('should create paywall with given properties', () => {
    const contentRef = {
      current: {
        contentRef: { current: 'blabla' } as RefObject<any>,
        mode: 'excerpt',
        percent: 96,
      },
    } as RefObject<RestrictedContentRef>;
    const createPaywallMock = vi.fn();
    const createFactoryMock = vi.fn().mockReturnValue({
      createPaywall: createPaywallMock,
      once: vi.fn(),
      off: vi.fn(),
    });

    render(withAccess(<Paywall pageType="premium" contentRef={contentRef} />, {
      createFactory: createFactoryMock,
    }));

    expect(createFactoryMock).toHaveBeenCalled();
    expect(createPaywallMock).toHaveBeenCalledWith({
      pageType: 'premium',
      target: expect.anything(),
      content: 'blabla',
      mode: 'excerpt',
      percent: 96,
    });
  });

  it('should recreate paywall if cookies_enabled has changed', async () => {
    const createPaywallMock = vi.fn();
    const config = { cookies_enabled: false };
    const createFactoryMock = vi.fn().mockReturnValue({
      createPaywall: createPaywallMock,
      once: vi.fn(),
      off: vi.fn(),
    });

    const { rerender } = render(withAccess(<Paywall />, {
      createFactory: createFactoryMock,
      config,
    }));

    expect(createFactoryMock).toHaveBeenCalled();
    expect(createPaywallMock).toHaveBeenCalled();

    config.cookies_enabled = true;
    rerender(withAccess(<Paywall />, {
      createFactory: createFactoryMock,
      config,
    }));
    await waitFor(() => expect(createPaywallMock).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(createFactoryMock).toHaveBeenCalledTimes(2));
  });

  describe('Premium content', () => {
    it('should render', () => {
      const { container } = render(<Paywall id="test" />);
      expect(container.querySelectorAll('#test').length).toBe(1);
    });

    it('should render without an id set', () => {
      const { container } = render(<Paywall />);
      expect(container.querySelectorAll('.poool-widget').length).toBe(1);
    });
  });
});
