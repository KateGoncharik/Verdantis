// https://docs.commercetools.com/api/projects/me-profile#authenticate-sign-in-customer
// https://docs.commercetools.com/api/projects/me-profile#mycustomersignin
// https://docs.commercetools.com/api/projects/customers#customer

import { isAxiosError } from 'axios';
import { z } from 'zod';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { SignInResult, signInResultSchema } from './schemas/sign-in-result.schema';

const myCustomerSignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type MyCustomerSignIn = z.infer<typeof myCustomerSignInSchema>;

export async function signInCustomer(
  { email, password }: MyCustomerSignIn,
  BEARER_TOKEN: string,
): Promise<SignInResult> {
  try {
    const customerSignInResult = await apiInstance.post(
      `/${envVariables.PROJECT_KEY}/me/login`,
      {
        email,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      },
    );

    return signInResultSchema.parse(customerSignInResult.data);
  } catch (e) {
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}
