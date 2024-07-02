import { useState } from 'react';

import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { SignInResult } from '@/lib/axios/requests/schemas/sign-in-result.schema';
import { TokenInfo } from '@/lib/axios/requests/schemas/token-info.schema';
import { signUpAndLogin } from '@/lib/axios/requests/sign-up-and-login';
import { MyCustomerDraft } from '@/lib/axios/requests/sign-up-customer';
import { useCartStore } from '@/stores/cart-store';
import { useCustomerStore } from '@/stores/customer-store';
import { useTokenStore } from '@/stores/token-store';

export function useRegistrationFormMutation(): [
  UseMutationResult<[TokenInfo, SignInResult], Error, MyCustomerDraft>,
  string,
] {
  const store = useTokenStore();
  const token = store.token;
  const customerStore = useCustomerStore();
  const cartStore = useCartStore();
  const [errorMessage, setErrorMessage] = useState('');
  const registrationMutation = useMutation({
    mutationFn: (data: MyCustomerDraft) => {
      if (!token) {
        throw new Error('no token found');
      }
      return signUpAndLogin(data, token);
    },
    onError: (error) => {
      console.log(error);
      setErrorMessage(error.message);
    },
    onSuccess: ([tokenInfo, customerInfo]) => {
      console.log(customerInfo);
      customerStore.setCustomer(customerInfo.customer);
      if (customerInfo.cart) {
        cartStore.setCart(customerInfo.cart);
      } else {
        console.log('no cart');
      }
      const token = tokenInfo.access_token;
      store.setToken({ token, type: 'password' });
    },
  });
  return [registrationMutation, errorMessage] as const;
}
