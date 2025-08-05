import type { Poool } from 'poool-access';
import type { ReactNode } from 'react';
import puppeteer, { type LaunchOptions } from 'puppeteer';

import {
  type AccessContextValue,
  type AuditContextValue,
  AccessContext,
  AuditContext,
} from '../src/contexts';

export const createBrowser = (opts?: LaunchOptions) =>
  puppeteer.launch({
    headless: !process.env.HEADFULL,
    dumpio: true,
    ...opts,
    args: ['--no-sandbox', ...opts?.args || []],
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
