import { Mock, describe, expect, it, vi } from 'vitest';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { getAllProducts } from './get-products';
import { data } from './get-products.mocks';

vi.mock('../axios-instances', () => ({
  apiInstance: {
    get: vi.fn(),
  },
}));

const mockedGetApiInstance = (apiInstance as unknown as { get: Mock }).get;

const baseURL = `/${envVariables.PROJECT_KEY}/product-projections?limit=7&offset=0`;

describe('getAllProducts', () => {
  const token = 'mock-token';

  it('should return products data when request is successful', async () => {
    mockedGetApiInstance.mockReturnValue(Promise.resolve({ data }));
    const result = await getAllProducts(0, token);
    expect(mockedGetApiInstance).toBeCalledWith(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result).toEqual(data);
  });
});
