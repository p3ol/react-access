import type { SpawndChildProcess } from 'spawnd';
import type { Browser, Page } from 'puppeteer';
import type { RefObject } from 'react';
import { render, waitFor } from '@testing-library/react';
import devServer from 'jest-dev-server';

import type { RestrictedContentRef } from '../RestrictedContent';
import { withAccess, createBrowser, sleep } from '~/tests/utils';
import Paywall from './index';

jest.setTimeout(30000);

describe('<Paywall />', () => {
  let server: SpawndChildProcess[];
  let browser: Browser;

  beforeAll(async () => {
    process.env.TEST_PORT = '63002';

    server = await devServer.setup({
      command: 'yarn example:basic',
      host: 'localhost',
      port: 63002,
      launchTimeout: 30000,
    });

    browser = await createBrowser();
  });

  it('should create paywall at start', () => {
    const createPaywallMock = jest.fn();
    const createFactoryMock = jest.fn().mockReturnValue({
      createPaywall: createPaywallMock,
      once: jest.fn(),
      off: jest.fn(),
    });

    render(withAccess(<Paywall />, {
      createFactory: createFactoryMock,
    }));

    expect(createFactoryMock).toHaveBeenCalled();
    expect(createPaywallMock).toHaveBeenCalled();
  });

  it('should set listener on identityAvailable event ', () => {
    const onceMock = jest.fn();
    const createFactoryMock = jest.fn().mockReturnValue({
      createPaywall: jest.fn(),
      once: onceMock,
      off: jest.fn(),
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
    const createPaywallMock = jest.fn();
    const createFactoryMock = jest.fn().mockReturnValue({
      createPaywall: createPaywallMock,
      once: jest.fn(),
      off: jest.fn(),
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
    const createPaywallMock = jest.fn();
    const config = { cookies_enabled: false };
    const createFactoryMock = jest.fn().mockReturnValue({
      createPaywall: createPaywallMock,
      once: jest.fn(),
      off: jest.fn(),
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
    let page: Page;

    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:63002/premium');
    });

    it('should render', () => {
      const { container } = render(<Paywall id="test" />);
      expect(container.querySelectorAll('#test').length).toBe(1);
    });

    it('should render without an id set', () => {
      const { container } = render(<Paywall />);
      expect(container.querySelectorAll('.poool-widget').length).toBe(1);
    });

    it('should render a full paywall when used with all necessary' +
      'siblings', async () => {
      await page.waitForSelector('iframe#p3-paywall');
      const src = await page.evaluate(() =>
        document.querySelector<HTMLIFrameElement>('iframe#p3-paywall').src
      );

      expect(src).toBe('https://assets.poool.fr/paywall-frame.html');
    });

    it('should fire onIdentityAvailable event handler', async () => {
      await page.waitForSelector('#on-identity-available');
      const identity = await page.evaluate(() =>
        JSON.parse(document
          .querySelector<HTMLDivElement>('#on-identity-available').innerText)
      );

      expect(identity).toBeDefined();
      expect(identity.user_id).toBeDefined();
    });

    it('should fire onReady event handler', async () => {
      await page.waitForSelector('#on-ready');
      const ready = await page.evaluate(() =>
        JSON.parse(document
          .querySelector<HTMLDivElement>('#on-ready').innerText)
      );

      expect(ready).toBe(true);
    });

    afterAll(async () => {
      await page.close();
    });
  });

  describe('Consent', () => {
    let page: Page;

    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:63002/consent');
    });

    it('should automatically rerender paywall when giving ' +
      'consent', async () => {
      jest.useRealTimers();

      await page.waitForSelector('#on-ready');
      const content = await page.evaluate(() =>
        document.querySelector<HTMLDivElement>('#restricted-content').innerText
      );

      expect(content).toBe('This sentence should...');

      await sleep(11);

      await page.evaluate(() =>
        document.querySelector<HTMLButtonElement>('#consent-button').click()
      );

      await sleep(11);

      const contentAfterConsent = await page.evaluate(() =>
        document.querySelector<HTMLDivElement>('#restricted-content').innerText
      );

      expect(contentAfterConsent).toBe('This sentence should...');
    });

    afterAll(async () => {
      await page.close();
    });
  });

  describe('Routing', () => {
    let page: Page;

    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:63002/alt-home');
    });

    it('should not re-render paywall multiple times on route ' +
      'change', async () => {
      await page.click('#consent-link');

      await page.waitForSelector('#on-ready');
      const content = await page.evaluate(() =>
        document.querySelector<HTMLDivElement>('#mounted').innerText
      );

      expect(content).toBe('1');
    });

    afterAll(async () => {
      await page.close();
    });
  });

  afterAll(async () => {
    await devServer.teardown(server);
    await browser.close();
  });
});
