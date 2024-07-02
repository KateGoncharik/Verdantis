import { Mock, describe, expect, it, vi } from 'vitest';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { getProductById } from './get-product-by-id';
import { data, expectedResult } from './get-product-by-id.mocks';

vi.mock('../axios-instances', () => ({
  apiInstance: {
    get: vi.fn(),
  },
}));

const mockedGetApiInstance = (apiInstance as unknown as { get: Mock }).get;

const baseURL = `/${envVariables.PROJECT_KEY}/product-projections`;

describe('getProductById', () => {
  const id = '123';
  const token = 'mock-token';

  it('should return product data when request is successful', async () => {
    mockedGetApiInstance.mockReturnValue(Promise.resolve({ data }));
    const result = await getProductById(id, token);
    expect(mockedGetApiInstance).toBeCalledWith(`${baseURL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result).toEqual(expectedResult);
  });
});
