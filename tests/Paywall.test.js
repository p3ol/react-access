import React from 'react';
import puppeteer from 'puppeteer';
import devServer from 'jest-dev-server';
import { render } from '@testing-library/react';

import { Paywall } from '../src';

describe('<Paywall />', () => {
  let browser;

  beforeAll(async () => {
    jest.setTimeout(30000);
    process.env.TEST_PORT = 63002;
    await devServer.setup({
      command: 'yarn serve',
      port: 63002,
      launchTimeout: 30000,
    });

    browser = await puppeteer.launch();
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

      expect(src).toBe('https://assets.poool.fr/paywall.html');
    });

    it('should fire beforeInit handler', async () => {
      await page.waitForSelector('#before-init');
      const beforeInit = await page.evaluate(() =>
        JSON.parse(document.querySelector('#before-init').innerText)
      );

      expect(beforeInit).toBe(true);
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

      const mounted = await page.evaluate(() =>
        document.querySelector('#mounted').innerText
      );

      expect(mounted).toBe('2');
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
      await page.click('#premium-link');

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
