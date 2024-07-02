import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { type CartResponse, cartResponseSchema } from './schemas/cart-schema';

export async function deleteCart(BEARER_TOKEN: string, cartId: string, cartVersion: number): Promise<CartResponse> {
  const query = `/${envVariables.PROJECT_KEY}/me/carts/${cartId}?version=${cartVersion}`;
  const encoded = encodeURI(query);
  try {
    const deleteCartResult = await apiInstance.delete(encoded, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return cartResponseSchema.parse(deleteCartResult.data);
  } catch (e) {
    console.error('Error occurred while deleting cart:', e);
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}
