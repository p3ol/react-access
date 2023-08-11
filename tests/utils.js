import puppeteer from 'puppeteer';

import { AccessContext, AuditContext } from '../src/contexts';

export const createBrowser = () =>
  puppeteer.launch({
    headless: process.env.HEADFULL ? false : 'new',
    pipe: true,
  });

export const withAudit = (component, audit = {}) => (
  <AuditContext.Provider
    value={{
      ...audit,
      lib: {
        config: function () { return this; },
        ...audit.lib,
      },
    }}
  >
    { component }
  </AuditContext.Provider>
);

export const withAccess = (component, access = {}) => (
  <AccessContext.Provider value={{ ...access }}>
    { component }
  </AccessContext.Provider>
);

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
