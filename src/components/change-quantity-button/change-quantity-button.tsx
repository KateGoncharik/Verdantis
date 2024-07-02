import { FC } from 'react';

import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { CartResponse } from '@/lib/axios/requests/schemas/cart-schema';
import { type CartUpdateAction } from '@/lib/axios/requests/update-cart/update-actions.types';
import { updateCart } from '@/lib/axios/requests/update-cart/update-request';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

export const ChangeQuantityButton: FC<{
  action: '+' | '-';
  currentQuantity: number;
  productId: string;
}> = ({ action, currentQuantity, productId }) => {
  const { cart, setCart } = useCartStore();
  const { token } = useTokenStore();

  const handleUpdate = (
    cartId: string,
    cartVersion: number,
    actions: CartUpdateAction[],
    BEARER_TOKEN: string,
  ): Promise<CartResponse> => {
    if (!cart || !token) {
      throw new Error('Missing info to update cart');
    }
    return updateCart(cartId, cartVersion, actions, BEARER_TOKEN);
  };
  const newQuantity = action === '+' ? currentQuantity + 1 : currentQuantity - 1;

  const quantityMutation = useMutation<
    CartResponse,
    Error,
    {
      BEARER_TOKEN: string;
      actions: CartUpdateAction[];
      cartId: string;
      cartVersion: number;
    }
  >({
    mutationFn: ({ BEARER_TOKEN, actions, cartId, cartVersion }) =>
      handleUpdate(cartId, cartVersion, actions, BEARER_TOKEN),
    onSuccess: (data) => {
      setCart(data);
    },
  });
  const handleClick = (): void => {
    if (!cart || !token) {
      throw new Error('Missing info to update cart');
    }
    quantityMutation.mutate({
      BEARER_TOKEN: token,
      actions: [{ action: 'changeLineItemQuantity', lineItemId: productId, quantity: newQuantity }],
      cartId: cart.id,
      cartVersion: cart.version,
    });
  };

  return (
    <Button disabled={currentQuantity <= 0 || quantityMutation.isPending} onClick={handleClick} variant="contained">
      {action}
    </Button>
  );
};
