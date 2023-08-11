import React from 'react';
import puppeteer from 'puppeteer';
import devServer from 'jest-dev-server';
import { render, waitFor } from '@testing-library/react';

import { withAccess } from '~tests-utils';
import Paywall from './index';

describe('<Paywall />', () => {
  jest.setTimeout(30000);
  let browser;

  beforeAll(async () => {
    process.env.TEST_PORT = 63002;
    await devServer.setup({
      command: 'yarn serve',
      port: 63002,
      launchTimeout: 30000,
    });

    browser = await puppeteer.launch({
      headless: true,
      dumpio: true,
      pipe: true,
      args: [
        '--enable-logging',
        '--lang=en-US,en',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
      ],
    });
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
        contentRef: { current: 'blabla' },
        mode: 'excerpt',
        percent: 96,
      },
    };
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
    let page;

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
        document.querySelector('iframe#p3-paywall').src
      );

      expect(src).toBe('https://assets.poool.fr/paywall-frame.html');
    });

    it('should fire onIdentityAvailable event handler', async () => {
      await page.waitForSelector('#on-identity-available');
      const identity = await page.evaluate(() =>
        JSON.parse(document.querySelector('#on-identity-available').innerText)
      );

      expect(identity).toBeDefined();
      expect(identity.user_id).toBeDefined();
    });

    it('should fire onReady event handler', async () => {
      await page.waitForSelector('#on-ready');
      const ready = await page.evaluate(() =>
        JSON.parse(document.querySelector('#on-ready').innerText)
      );

      expect(ready).toBe(true);
    });

    afterAll(async () => {
      await page.close();
    });
  });

  describe('Consent', () => {
    let page;

    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:63002/consent');
    });

    it('should automatically rerender paywall when giving ' +
      'consent', async () => {
      jest.useRealTimers();

      await page.waitForSelector('#on-ready');
      const content = await page.evaluate(() =>
        document.querySelector('#restricted-content').innerText
      );

      expect(content).toBe('This sentence should...');

      await new Promise(resolve => setTimeout(resolve, 11));

      await page.evaluate(() =>
        document.querySelector('#consent-button').click()
      );

      await new Promise(resolve => setTimeout(resolve, 11));

      const contentAfterConsent = await page.evaluate(() =>
        document.querySelector('#restricted-content').innerText
      );

      expect(contentAfterConsent).toBe('This sentence should...');
    });

    afterAll(async () => {
      await page.close();
    });
  });

  describe('Routing', () => {
    let page;

    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:63002/alt-home');
    });

    it('should not re-render paywall multiple times on route ' +
      'change', async () => {
      await page.click('#consent-link');

      await page.waitForSelector('#on-ready');
      const content = await page.evaluate(() =>
        document.querySelector('#mounted').innerText
      );

      expect(content).toBe('1');
    });

    afterAll(async () => {
      await page.close();
    });
  });

  afterAll(async () => {
    await devServer.teardown();
    await browser.close();
  });
});
