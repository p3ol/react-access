import puppeteer from 'puppeteer';
import devServer from 'jest-dev-server';

jest.setTimeout(30000);

describe('hooks.js', () => {

  describe('useAccess()', () => {
    let browser, page;

    beforeAll(async () => {
      process.env.TEST_PORT = 63001;
      await devServer.setup({
        command: 'yarn serve',
        port: 63001,
        launchTimeout: 30000,
      });

      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto('http://localhost:63001/');
    });

    it('should provide the access lib', async () => {
      await page.waitForSelector('#has-access');
      const hasAccess = await page.evaluate(() =>
        JSON.parse(document.querySelector('#has-access').innerText)
      );

      expect(hasAccess).toBe(true);
    });

    it('should provide the audit lib', async () => {
      await page.waitForSelector('#has-audit');
      const hasAudit = await page.evaluate(() =>
        JSON.parse(document.querySelector('#has-audit').innerText)
      );

      expect(hasAudit).toBe(true);
    });

    it('should provide an appId property', async () => {
      await page.waitForSelector('#has-app-id');
      const hasAppId = await page.evaluate(() =>
        JSON.parse(document.querySelector('#has-app-id').innerText)
      );

      expect(hasAppId).toBe(true);
    });

    it('should provide a config object', async () => {
      await page.waitForSelector('#has-config');
      const hasConfig = await page.evaluate(() =>
        JSON.parse(document.querySelector('#has-config').innerText)
      );

      expect(hasConfig).toBe(true);
    });

    it('should provide a styles object', async () => {
      await page.waitForSelector('#has-styles');
      const hasStyles = await page.evaluate(() =>
        JSON.parse(document.querySelector('#has-styles').innerText)
      );

      expect(hasStyles).toBe(true);
    });

    it('should provide a texts object', async () => {
      await page.waitForSelector('#has-texts');
      const hasTexts = await page.evaluate(() =>
        JSON.parse(document.querySelector('#has-texts').innerText)
      );

      expect(hasTexts).toBe(true);
    });

    afterAll(async () => {
      await devServer.teardown();
      await browser.close();
    });

  });
});
