import { toast } from 'react-toastify';

import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { Customer } from '@/lib/axios/requests/schemas/customer.schema';
import { updateCustomer } from '@/lib/axios/requests/update-customer/update-request';
import { useCustomerStore } from '@/stores/customer-store';
import { useTokenStore } from '@/stores/token-store';

import { RegistrationAddress } from '../registration-form/registration-form-types';

type Props = {
  address: RegistrationAddress;
  id: string;
};

export function useEditAddressMutation(): [UseMutationResult<Customer, Error, Props>] {
  const token = useTokenStore().token;
  const customerStore = useCustomerStore();
  const changeAddress = ({ address, id }: Props): Promise<Customer> => {
    if (!customerStore.customer) {
      throw new Error('no customer in store');
    }
    if (!token) {
      throw new Error('no token in store');
    }
    const updateResponse = updateCustomer(
      customerStore.customer.version,
      [{ action: 'changeAddress', address, addressId: id }],
      token,
    );

    console.log(updateResponse);
    return updateResponse;
  };
  const editAddressMutation = useMutation({
    mutationFn: changeAddress,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      customerStore.setCustomer(response);
      toast.success('The data was successfully updated!');
    },
  });
  return [editAddressMutation] as const;
}
