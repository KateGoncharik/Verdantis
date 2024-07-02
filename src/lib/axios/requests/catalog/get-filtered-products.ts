import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';
import { apiInstance } from '@/lib/axios/axios-instances';

import { axiosErrorMsgSchema } from '../schemas/axios-error-msg.schema';
import { type ProductsResponse, getProductsResultSchema } from '../schemas/product-schema';
import { ProductsRequestArguments } from './catalog-types';

export async function getFilteredProducts(
  offset = 0,
  BEARER_TOKEN: string,
  filters: string,
): Promise<ProductsResponse> {
  const queryArgs: ProductsRequestArguments = { limit: 7, offset };
  const query = `/${envVariables.PROJECT_KEY}/product-projections/search?limit=${queryArgs.limit}&offset=${queryArgs.offset}&${filters}`;

  try {
    const getProductsResult = await apiInstance.get(query, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return getProductsResultSchema.parse(getProductsResult.data);
  } catch (e) {
    console.error('Error occurred while getting products:', e);
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}

export const buildQueryString = (params: IterableIterator<[string, string]>): string => {
  const result: string[] = [];
  for (const [key, value] of params) {
    if (key === 'color' && value) {
      const colors = value.split('-');
      colors.forEach((color) => {
        result.push(`filter=variants.attributes.${key}:"${color}"`);
      });
    } else if (key === 'category' && value) {
      const query = `filter=categories.id: subtree("${value}")`;
      result.push(query);
    } else if (key === 'size' && value) {
      result.push(`filter=variants.attributes.${encodeURIComponent(key)}:"${encodeURIComponent(value)}"`);
    } else if (key === 'sort' && value) {
      const formattedSort = value.split('-').join(' ');
      result.push(`${key}=${formattedSort}`);
    } else if (key === 'q' && value) {
      result.push('fuzzy=true');
      result.push(`text.en="${value}"`);
    }
  }
  return result.join('&');
};
