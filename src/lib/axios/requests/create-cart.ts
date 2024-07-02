import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { type CartResponse, cartResponseSchema } from './schemas/cart-schema';

export async function createCart(BEARER_TOKEN: string): Promise<CartResponse> {
  const query = `/${envVariables.PROJECT_KEY}/me/carts`;
  const encoded = encodeURI(query);
  try {
    const createCartResult = await apiInstance.post(
      encoded,

      { currency: 'EUR' },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      },
    );
    return cartResponseSchema.parse(createCartResult.data);
  } catch (e) {
    console.error('Error occurred while creating cart:', e);
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}
