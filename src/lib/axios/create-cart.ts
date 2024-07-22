import { Cart } from '@/stores/cart-store';

export const createCart = (): Cart => {
  return { products: [] };
};
