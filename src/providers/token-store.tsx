import { type FC, type PropsWithChildren } from 'react';

import { useInitTokenStore } from '@/stores/token-store';

export const TokenStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  useInitTokenStore();
  return children;
};
