import React, { createRef, forwardRef } from 'react';
import puppeteer from 'puppeteer';
import devServer from 'jest-dev-server';
import { render } from '@testing-library/react';

import { usePoool } from '../src';

const TestComponent = forwardRef((_, ref) => {
  const obj = usePoool();
  ref.current = obj;

  return null;
});

describe('hooks.js', () => {
  describe('usePoool()', () => {
    let browser, page;

    beforeAll(async () => {
      jest.setTimeout(30000);
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

    it('should provide an object with some props', () => {
      const ref = createRef();
      render(<TestComponent ref={ref} />);
      expect(ref.current).toBeTruthy();
      expect(ref.current).toHaveProperty('poool');
      expect(ref.current).toHaveProperty('appId');
      expect(ref.current).toHaveProperty('config');
      expect(ref.current).toHaveProperty('styles');
      expect(ref.current).toHaveProperty('texts');
    });

    it('should provide a poool function', async () => {
      await page.waitForSelector('#has-poool');
      const hasPoool = await page.evaluate(() =>
        JSON.parse(document.querySelector('#has-poool').innerText)
      );

      expect(hasPoool).toBe(true);
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
