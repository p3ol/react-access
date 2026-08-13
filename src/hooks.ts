import { use } from 'react';

import { AccessContext, AuditContext } from './contexts';

export const useAccess = () => use(AccessContext);
export const useAudit = () => use(AuditContext);
