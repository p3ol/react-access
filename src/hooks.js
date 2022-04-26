import { useContext } from 'react';

import { AccessContext, AuditContext } from './contexts';

export const useAccess = () => useContext(AccessContext);
export const useAudit = () => useContext(AuditContext);
