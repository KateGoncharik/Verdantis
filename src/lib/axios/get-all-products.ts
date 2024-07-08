import { isAxiosError } from 'axios';

import { apiInstance } from './axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { type Product, allProductsSchema } from './schemas/product-schema';

export async function getAllProducts(): Promise<Array<Product>> {
  const query = `exported-products.json`;
  try {
    const getProductsResult = await apiInstance.get(query, {});
    return allProductsSchema.parse(getProductsResult.data);
  } catch (e) {
    console.error('Error occurred while getting all products:', e);
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}
