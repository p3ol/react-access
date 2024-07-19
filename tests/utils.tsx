import type { Poool } from 'poool-access';
import type { ReactNode } from 'react';
import puppeteer, { type PuppeteerLaunchOptions } from 'puppeteer';

import {
  type AccessContextValue,
  type AuditContextValue,
  AccessContext,
  AuditContext,
} from '../src/contexts';

export const createBrowser = (opts?: PuppeteerLaunchOptions) =>
  puppeteer.launch({
    headless: !process.env.HEADFULL,
    pipe: true,
    ...opts,
  });

export const withAudit = (
  children: ReactNode,
  audit: Partial<Omit<AuditContextValue, 'lib'>> & {
    lib?: Partial<Poool.Audit>;
  } = {}
) => (
  <AuditContext.Provider
    value={{
      ...audit,
      lib: {
        config: function () { return this; },
        ...audit.lib,
      },
    } as AuditContextValue}
  >
    { children }
  </AuditContext.Provider>
);

export const withAccess = (
  children: ReactNode,
  access: AccessContextValue = {}
) => (
  <AccessContext.Provider value={{ ...access }}>
    { children }
  </AccessContext.Provider>
);

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
