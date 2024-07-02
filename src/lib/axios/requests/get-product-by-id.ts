import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { Price, ProductImages } from './get-product-by-id.types';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { ProductSchema } from './schemas/get-product-by-id.schema';

export const getProductById = async (
  id: string,
  token: null | string,
): Promise<{ description: string; images: ProductImages; name: string; prices: Price[] }> => {
  const languageCode = 'en-US';
  try {
    const response = await apiInstance.get(`/${envVariables.PROJECT_KEY}/product-projections/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = ProductSchema.parse(response.data);
    const prices = data.masterVariant.prices;
    const name = data.name[languageCode];
    const description = data.description[languageCode];
    const images = data.masterVariant.images;
    return { description, images, name, prices };
  } catch (e) {
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
};
