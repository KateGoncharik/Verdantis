import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';
import { Passwords } from '@/features/password-form';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { Customer, customerSchema } from './schemas/customer.schema';

export async function changePassword(
  { currentPassword, newPassword }: Passwords,
  BEARER_TOKEN: string,
  version: number,
): Promise<Customer> {
  try {
    const result = await apiInstance.post(
      `/${envVariables.PROJECT_KEY}/me/password`,
      {
        currentPassword,
        newPassword,
        version,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      },
    );

    return customerSchema.parse(result.data);
  } catch (e) {
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}
