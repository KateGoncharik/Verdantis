import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../../axios-instances';
import { axiosErrorMsgSchema } from '../schemas/axios-error-msg.schema';
import { CartResponse, cartResponseSchema } from '../schemas/cart-schema';
import { CartUpdateAction } from './update-actions.types';

export async function updateCart(
  cartId: string,
  cartVersion: number,
  actions: CartUpdateAction[],
  BEARER_TOKEN: string,
): Promise<CartResponse> {
  try {
    const customerUpdateResult = await apiInstance.post(
      `/${envVariables.PROJECT_KEY}/me/carts/${cartId}`,
      {
        actions,
        version: cartVersion,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      },
    );

    return cartResponseSchema.parse(customerUpdateResult.data);
  } catch (e) {
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}
