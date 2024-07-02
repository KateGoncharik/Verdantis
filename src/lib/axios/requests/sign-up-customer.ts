import { isAxiosError } from 'axios';
import { z } from 'zod';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { myCustomerDraftSchema } from './schemas/my-customer-draft-schema';
import { SignUpResult, signUpResultSchema } from './schemas/sign-up-result-schema';

export type MyCustomerDraft = z.infer<typeof myCustomerDraftSchema>;

export async function signUpCustomer(myCustomerDraft: MyCustomerDraft, BEARER_TOKEN: string): Promise<SignUpResult> {
  try {
    const customerSignInResult = await apiInstance.post(`/${envVariables.PROJECT_KEY}/me/signup`, myCustomerDraft, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    return signUpResultSchema.parse(customerSignInResult.data);
  } catch (e) {
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}
