import type { ReactNode } from 'react';

import { AppProvider } from '../providers/app';

export function App(): ReactNode {
  return <AppProvider />;
}
