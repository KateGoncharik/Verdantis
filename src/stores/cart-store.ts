import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { type CartResponse } from '@/lib/axios/requests/schemas/cart-schema';

type CartState = {
  cart: CartResponse | null;
  resetStore: () => void;
  setCart: (cart: CartResponse) => void;
};

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        cart: null,
        resetStore: () => {
          set({ cart: null });
        },
        setCart: (cart) => set({ cart }),
      }),
      { name: 'verdantisCart' },
    ),
  ),
);
