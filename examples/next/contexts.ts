import { createContext } from 'react';

export interface PageContextValue {
  cookiesEnabled?: boolean;
  setCookiesEnabled?(enabled: boolean): void;
}

export const PageContext = createContext<PageContextValue>({});
