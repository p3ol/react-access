import { TextDecoder, TextEncoder } from 'node:util';

import type { Poool } from 'poool-access';
import type { ReactNode } from 'react';
import puppeteer, { type LaunchOptions } from 'puppeteer';

import {
  type AccessContextValue,
  type AuditContextValue,
  AccessContext,
  AuditContext,
} from '../src/contexts';

globalThis.TextDecoder = TextDecoder;
globalThis.TextEncoder = TextEncoder;

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
  <AuditContext
    value={{
      ...audit,
      lib: {
        config: function () { return this; },
        ...audit.lib,
      },
    } as AuditContextValue}
  >
    { children }
  </AuditContext>
);

export const withAccess = (
  children: ReactNode,
  access: AccessContextValue = {}
) => (
  <AccessContext value={{ ...access }}>
    { children }
  </AccessContext>
);

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
