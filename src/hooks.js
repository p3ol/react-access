import { useContext } from 'react';

import { AccessContext } from './contexts';

export const useAccess = () => useContext(AccessContext);
