import { useEffect } from 'react';

import { type Draft, produce } from 'immer';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createCart } from '@/lib/axios/create-cart';
import { Product } from '@/lib/axios/schemas/product-schema';

export type Cart = { products: Product[] };

type CartState = {
  cart: Cart | null;
  removeProduct: (productId: string) => void;
  resetStore: () => void;
  setCart: (cart: Cart) => void;
  updateProducts: (products: Product[]) => void;
};

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        cart: null,
        removeProduct: (productId: string) => {
          set(
            produce((draft: Draft<CartState>) => {
              if (!draft.cart) {
                throw new Error('No cart');
              }
              draft.cart.products = draft.cart.products.filter((product) => product.id !== productId);
            }),
          );
        },
        resetStore: () => {
          set({ cart: null });
        },
        setCart: (cart) => set({ cart }),
        updateProducts: (newProducts) => {
          set(
            produce((draft: Draft<CartState>) => {
              if (!draft.cart) {
                throw new Error('No cart');
              }
              draft.cart.products.push(...newProducts);
            }),
          );
        },
      }),

      { name: 'verdantisCart' },
    ),
  ),
);

export const useInitCartStore = (): void => {
  const { setCart } = useCartStore();
  const cartStore = useCartStore();
  useEffect(() => {
    if (!cartStore.cart) {
      setCart(createCart());
    }
  }, [setCart, cartStore.cart]);
};
