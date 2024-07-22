import { type FC, type PropsWithChildren } from 'react';

import { useInitCartStore } from '@/stores/cart-store';

export const CartStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  useInitCartStore();
  return children;
};
