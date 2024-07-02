import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { CartResponse, cartResponseSchema } from './schemas/cart-schema';

export async function getCart(BEARER_TOKEN: string): Promise<CartResponse> {
  const query = `/${envVariables.PROJECT_KEY}/me/active-cart`;
  const encoded = encodeURI(query);
  try {
    const getCartResult = await apiInstance.get(encoded, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return cartResponseSchema.parse(getCartResult.data);
  } catch (e) {
    console.error('Error occurred while getting cart:', e);
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}
