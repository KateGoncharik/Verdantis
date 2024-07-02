import { useEffect } from 'react';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createCart } from '@/lib/axios/requests/create-cart';
import { getAnonymousToken } from '@/lib/axios/requests/get-anonymous-token';
import { type CartResponse } from '@/lib/axios/requests/schemas/cart-schema';

import { useCartStore } from './cart-store';

type Token = null | string;

type TokenType = 'anonymous' | 'password' | null;

type TokenState = {
  fetchAnonToken: () => Promise<void>;
  resetStore: () => Promise<void>;
  setToken: (state: { token: Token; type: TokenType }) => void;
  token: Token;
  type: TokenType;
};

export const useTokenStore = create<TokenState>()(
  devtools(
    persist(
      (set, get) => ({
        fetchAnonToken: async () => {
          if (get().token === null) {
            const tokenInfo = await getAnonymousToken();
            get().setToken({ token: tokenInfo.access_token, type: 'anonymous' });
          }
        },
        resetStore: async () => {
          set({ token: null, type: null });
          await get().fetchAnonToken();
        },
        setToken: ({ token, type }) => set({ token, type }),
        token: null,
        type: null,
      }),
      { name: 'verdantisToken' },
    ),
  ),
);

export const useInitTokenStore = (): void => {
  const { fetchAnonToken, setToken, token } = useTokenStore();
  const { setCart } = useCartStore();
  const cartStore = useCartStore();
  useEffect(() => {
    fetchAnonToken()
      .then(() => {
        if (!cartStore.cart && token) {
          createCart(token).then(
            (res: CartResponse) => {
              setCart(res);
              setToken({ token, type: 'anonymous' });
            },
            (err) => console.error(err),
          );
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [fetchAnonToken, setCart, token, cartStore.cart, setToken]);
};
