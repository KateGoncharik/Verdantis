import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { CartResponse } from '@/lib/axios/requests/schemas/cart-schema';
import { CartUpdateAction } from '@/lib/axios/requests/update-cart/update-actions.types';
import { updateCart } from '@/lib/axios/requests/update-cart/update-request';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

export const PromocodeForm: FC = () => {
  const { clearErrors, formState, handleSubmit, register, setError } = useForm<{ promocode: string }>({});
  const { cart, setCart } = useCartStore();
  const { token } = useTokenStore();

  const promocodeMutation = useMutation<CartResponse, Error, { actions: CartUpdateAction[] }>({
    mutationFn: ({ actions }) => {
      if (!token || !cart) {
        throw new Error('Missing info for cart update');
      }
      return updateCart(cart.id, cart.version, actions, token);
    },
    onError: (error) => {
      setError('promocode', { message: error.message });
    },
    onSuccess: (data) => {
      setCart(data);
      clearErrors('promocode');
      toast.success('Code applied!');
    },
  });

  return (
    <form
      className="mx-auto my-5 block"
      onSubmit={(event) =>
        void handleSubmit(({ promocode }) => {
          promocodeMutation.mutate({ actions: [{ action: 'addDiscountCode', code: promocode }] });
        })(event)
      }
    >
      <TextField
        {...register('promocode')}
        error={Boolean(formState.errors.promocode?.message)}
        helperText={formState.errors.promocode?.message}
        label="Promocode"
        size="small"
      ></TextField>
      <Button type="submit" variant="contained">
        Apply
      </Button>
    </form>
  );
};
