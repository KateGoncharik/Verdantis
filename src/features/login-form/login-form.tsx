import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Collapse } from '@mui/material';
import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { SignInResult } from '@/lib/axios/requests/schemas/sign-in-result.schema.ts';
import { TokenInfo } from '@/lib/axios/requests/schemas/token-info.schema.ts';
import { useCartStore } from '@/stores/cart-store.ts';
import { useCustomerStore } from '@/stores/customer-store.ts';
import { useTokenStore } from '@/stores/token-store.ts';
import { UserCredentials } from '@/types/user-credentials.ts';

import { ControlledTextField } from '../../components/controlled-text-field';
import { loginUser } from '../../lib/axios/requests/login-user';
import { LoginInfo, loginSchema } from './login-form.schema.ts';
import { PasswordInput } from './password-input.tsx';

function useLoginFormMutation(): [UseMutationResult<[TokenInfo, SignInResult], Error, UserCredentials>, string] {
  const tokenStore = useTokenStore();
  const customerStore = useCustomerStore();
  const cartStore = useCartStore();
  const [errorMessage, setErrorMessage] = useState('');
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      console.log(error);
      setErrorMessage(error.message);
    },
    onSuccess: ([tokenInfo, customerInfo]) => {
      customerStore.setCustomer(customerInfo.customer);
      if (customerInfo.cart) {
        cartStore.setCart(customerInfo.cart);
      } else {
        console.log('no cart');
      }
      const token = tokenInfo.access_token;
      tokenStore.setToken({ token, type: 'password' });
    },
  });
  return [loginMutation, errorMessage] as const;
}

export const LoginForm: FC = () => {
  const { control, handleSubmit } = useForm<LoginInfo>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  const [loginMutation, errorMessage] = useLoginFormMutation();
  return (
    <form
      className="mx-auto flex max-w-96 flex-col gap-2"
      onSubmit={(e) =>
        void handleSubmit(({ email: username, password }): void => {
          loginMutation.mutate({ password, username });
        })(e)
      }
    >
      <ControlledTextField control={control} label="Email" name="email" />
      <PasswordInput {...{ control, name: 'password' }} />
      {
        <Collapse in={!!errorMessage}>
          <Alert severity="warning">{errorMessage}</Alert>
        </Collapse>
      }
      <Button disabled={loginMutation.isPending} type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
};
