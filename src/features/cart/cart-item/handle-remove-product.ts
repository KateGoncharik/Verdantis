import { MutableRefObject } from 'react';

import { removeLineItemFromCart } from '@/lib/axios/requests/remove-line-item-from-cart';
import { CartResponse } from '@/lib/axios/requests/schemas/cart-schema';

export const handleRemoveProduct = (
  token: string,
  cart: CartResponse,
  lineItemId: string,
  setterForCartRef: MutableRefObject<(cart: CartResponse) => void>,
): void => {
  const setCart = setterForCartRef.current;
  removeLineItemFromCart(token, cart.id, lineItemId, cart.version).then(
    (res) => {
      setCart(res);
    },
    (err) => console.error(err),
  );
};
