import type { SpawndChildProcess } from 'spawnd';
import type { Browser, Page } from 'puppeteer';
import { vi } from 'vitest';
import devServer from 'jest-dev-server';

import { createBrowser, sleep } from '~/tests/utils';

describe('<Paywall /> | E2E', () => {
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

  describe('Premium content', () => {
    let page: Page;

    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:63002/premium');
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
      vi.useRealTimers();

      await page.waitForSelector('#on-ready');
      const content = await page.evaluate(() =>
        document.querySelector<HTMLDivElement>('#restricted-content').innerText
      );

      expect(content)
        .toBe('This sentence should be almost complete....');

      await sleep(11);

      await page.evaluate(() =>
        document.querySelector<HTMLButtonElement>('#consent-button').click()
      );

      await sleep(11);

      const contentAfterConsent = await page.evaluate(() =>
        document.querySelector<HTMLDivElement>('#restricted-content').innerText
      );

      expect(contentAfterConsent)
        .toBe('This sentence should be almost complete....');
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
