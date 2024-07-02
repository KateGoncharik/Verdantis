import { toast } from 'react-toastify';

import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { changePassword } from '@/lib/axios/requests/change-password';
import { getToken } from '@/lib/axios/requests/get-token';
import { Customer } from '@/lib/axios/requests/schemas/customer.schema';
import { TokenInfo } from '@/lib/axios/requests/schemas/token-info.schema';
import { useCustomerStore } from '@/stores/customer-store';
import { useTokenStore } from '@/stores/token-store';

import { Passwords } from './passwords.schema';

export const usePasswordFormMutation = (): [UseMutationResult<[TokenInfo, Customer], Error, Passwords>] => {
  const tokenStore = useTokenStore();
  const customerStore = useCustomerStore();
  const changeUserPassword = async (passwordInfo: Passwords): Promise<[TokenInfo, Customer]> => {
    if (!tokenStore.token) {
      throw new Error('No token found');
    }
    const customer = customerStore.customer;
    if (!customer) {
      throw new Error('No customer in store');
    }
    if (passwordInfo.newPassword !== passwordInfo.repeatPassword) {
      throw new Error('The new and repeat passwords don`t match');
    }
    const passwordResponse = await changePassword(passwordInfo, tokenStore.token, customer.version);
    const tokenResponse = await getToken({ password: passwordInfo.newPassword, username: customer.email });
    return [tokenResponse, passwordResponse];
  };
  const passwordMutation = useMutation({
    mutationFn: changeUserPassword,
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
    onSuccess: ([tokenInfo, customerInfo]) => {
      customerStore.setCustomer(customerInfo);
      tokenStore.setToken({ token: tokenInfo.access_token, type: 'password' });
      toast.success('The password was changed');
    },
  });
  return [passwordMutation] as const;
};
