import { AccessContext, AuditContext } from '../src/contexts';

export const withAudit = (component, audit = {}) => (
  <AuditContext.Provider value={{ ...audit }}>
    { component }
  </AuditContext.Provider>
);

export const withAccess = (component, access = {}) => (
  <AccessContext.Provider value={{ ...access }}>
    { component }
  </AccessContext.Provider>
);
